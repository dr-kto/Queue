'use server'
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
    getCurrentOrderByEventAndUserParams,
    CreateEventOrderParams,
} from '@/types'
// import { useMemo, useState } from 'react'
import { revalidatePath } from 'next/cache'

export const isAlreadyOrdered = async ({
    eventId,
    userId,
}: isAlreadyOrderedParams) => {
    // const [isAvailable, setIsAvailable] = useState(false)

    try {
        const eventToCheck = await prisma.event.findFirst({
            where: {
                id: eventId,
            },
            include: {
                orders: true,
            },
        })

        const hasOrder = eventToCheck?.orders.length || 0

        if (hasOrder > 0) {
            const orderToCheck = await prisma.order.findMany({
                where: {
                    eventId: eventId,
                    bookerId: userId,
                },
            })
            if (orderToCheck.length > 0) {
                return true
            }
        }

        return false
    } catch (error) {
        handleError(error)
    }
}

export async function getOrdersByEvent({
    searchString,
    eventId,
    userName,
    email,
}: GetOrdersByEventParams) {
    try {
        if (!eventId) throw new Error('Event ID required')

        // const order = await prisma.order.findMany({
        //     where: {
        //         bookerId: userId,
        //     },
        //     include: {
        //         booker: true,
        //         event: {
        //             include: {
        //                 owner: true,
        //             },
        //         },
        //     },
        // })
        const order = await prisma.order.findMany({
            where: {
                eventId: eventId,
                // eventId: eventId,
                booker: {
                    email: {
                        contains: email,
                        mode: 'insensitive',
                    },
                    name: {
                        contains: userName,
                        mode: 'insensitive',
                    },
                },
            },
            include: {
                booker: true,
                event: {
                    include: {
                        owner: true,
                    },
                },
            },
        })
        // console.log(order[0])
        return JSON.parse(JSON.stringify(order))
    } catch (error) {
        handleError(error)
    }
}
export async function getCurrentOrderByEventAndUser({
    eventId,
    userId,
}: getCurrentOrderByEventAndUserParams) {
    try {
        if (!eventId) throw new Error('Event ID required')

        // const order = await prisma.order.findMany({
        //     where: {
        //         bookerId: userId,
        //     },
        //     include: {
        //         booker: true,
        //         event: {
        //             include: {
        //                 owner: true,
        //             },
        //         },
        //     },
        // })
        const newOrder = await prisma.order.findFirst({
            where: {
                event: {
                    id: eventId,
                },
                AND: [
                    {
                        // eventId: eventId
                        booker: {
                            id: userId,
                        },
                    },
                ],
            },
            include: {
                booker: true,
                event: true,
            },
        })
        // console.log(eventId, 'davel', userId)
        // console.log(newOrder, 'hiiiii')
        return JSON.parse(JSON.stringify(newOrder))
    } catch (error) {
        handleError(error)
    }
}
export async function getOrdersByUser({
    userId,
    limit = 3,
    page,
}: GetOrdersByUserParams) {
    try {
        const skipAmount = (Number(page) - 1) * limit

        const order = await prisma.order.findMany({
            where: {
                bookerId: userId,
            },
            skip: skipAmount,
            take: limit,
            include: {
                booker: true,
                event: {
                    include: {
                        owner: true,
                    },
                },
            },
        })
        // revalidatePath(path)
        // console.log('not failed', order)
        return JSON.parse(JSON.stringify(order))
        // redirect(`${process.env.NEXT_PUBLIC_SERVER_URL}/profile`)
        // redirect(`${process.env.NEXT_PUBLIC_SERVER_URL}/order/${newOrder.id}`)
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
