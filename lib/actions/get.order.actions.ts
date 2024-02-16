import prisma from '../prisma'
import { ObjectId } from 'mongodb'
import { redirect } from 'next/navigation'
import { handleError } from '../utils'
import { connectToDatabase } from '../database'
import { Order, Event, User } from '@prisma/client'
import {
    CheckoutOrderParams,
    CreateOrderParams,
    isAlreadyOrderedParams,
    GetOrdersByEventParams,
    GetOrdersByUserParams,
    CreateEventOrderParams,
} from '@/types'
import { useMemo, useState } from 'react'

export const isAlreadyOrdered = async ({
    eventId,
    userId,
}: isAlreadyOrderedParams) => {
    const [isAvailable, setIsAvailable] = useState(false)

    try {
        const eventToCheck = await prisma.event.findFirst({
            where: {
                id: eventId,
            },
            include: {
                orders: true,
            },
        })

        const userToCheck = await prisma.user.findFirst({
            where: {
                id: userId,
                orders: {
                    some: {
                        eventId: eventId,
                    },
                },
            },
            include: {
                orders: true,
            },
        })

        if (
            Number(eventToCheck?.reservationLimit) >=
                Number(eventToCheck?.orders.length) ||
            userToCheck
        ) {
            setIsAvailable(true)
            // return JSON.parse(JSON.stringify(newOrder))
        } else {
            setIsAvailable(false)
        }
    } catch (error) {
        handleError(error)
    }
    return isAvailable
}

export const createEventOrder = async (orderParams: CreateEventOrderParams) => {
    const { userId, eventId } = orderParams

    try {
        const eventToCheck = await prisma.event.findFirst({
            where: {
                id: eventId,
            },
            include: {
                owner: true,
                orders: true,
            },
        })

        if (eventToCheck?.reservationLimit !== eventToCheck?.orders.length) {
            const newOrder = await prisma.order.create({
                data: {
                    createdAt: new Date(),
                    booker: { connect: { id: userId } },
                    event: { connect: { id: eventId } },
                },
                include: {
                    booker: true,
                    event: true,
                },
            })
            return JSON.parse(JSON.stringify(newOrder))
        } else {
            return
        }

        // reservationLimit: orderParams.reservationLimit,
    } catch (error) {
        handleError(error)
    }
}

// export const createOrder = async (orderParams: CreateOrderParams) => {
//     const { bookerId, eventId,  } = orderParams

//     try {
//
//         const newOrder = await prisma.order.create({
//             data: {
//                 createdAt: new Date(),
//                 booker: { connect: { id: bookerId } },
//                 event: { connect: { id: eventId } },
//             },
//             include: {
//                 booker: true,
//                 event: true,
//             },
//         })
//         return JSON.parse(JSON.stringify(newOrder))
//     } catch (error) {
//         handleError(error)
//     }
// }
