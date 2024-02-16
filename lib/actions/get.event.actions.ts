'use server'

import prisma from '../prisma'
import {
    CreateEventParams,
    UpdateEventParams,
    DeleteEventParams,
    GetAllEventsParams,
    GetEventsByUserParams,
    GetRelatedEventsByCategoryParams,
} from '@/types'
import { revalidatePath } from 'next/cache'
import { connectToDatabase } from '@/lib/database'
// import Event from '@/lib/database/models/event.model'
// import User from '@/lib/database/models/user.model'
// import Category from '@/lib/database/models/category.model'
import { handleError } from '@/lib/utils'
import getCurrentUser from './getCurrentUser'
import { Console } from 'console'

const getCategoryByName = async (name: string) => {
    // const reg = { $regex: name, $options: 'i' }

    return await prisma.category.findFirst({
        where: {
            name: {
                contains: name,
            },
        },
    })
}

export async function createEvent({ userId, eventToCreate, path }: any) {
    const {
        title,
        description,
        location,
        image,
        startDateTime,
        endDateTime,
        reservationLimit,
        isNoLimit,
        url,
    } = eventToCreate

    // const owner = await prisma.user.findFirst({
    //     where: {
    //         id: userId,
    //     },
    // })

    if (!userId) throw new Error('Owner not found')

    try {
        const newEvent = await prisma.event.create({
            data: {
                title,
                description,
                location,
                image,
                startDateTime,
                endDateTime,
                reservationLimit,
                isNoLimit,
                url,
                // ...event,
                category: { connect: { id: eventToCreate.categoryId } },
                owner: { connect: { id: userId } },
            },
            include: {
                category: true,
                owner: true,
            },
        })
        revalidatePath(path)
        return JSON.parse(JSON.stringify(newEvent))
    } catch (error) {
        handleError(error)
    }
}

export async function updateEvent({
    userId,
    eventToUpdate,
    path,
}: UpdateEventParams) {
    const {
        title,
        description,
        location,
        image,
        startDateTime,
        endDateTime,
        reservationLimit,
        isNoLimit,
        url,
    } = eventToUpdate

    if (!userId) throw new Error('Owner not found')

    try {
        // console.log('uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu')
        const updatedEvent = await prisma.event.findFirst({
            where: {
                id: eventToUpdate.id,
            },
            include: {
                owner: true,
                category: true,
            },
        })
        // hex
        if (!updatedEvent || updatedEvent.owner.id !== userId) {
            throw new Error('Unauthorized or event not found')
        }

        const newEvent = await prisma.event.update({
            where: {
                id: eventToUpdate.id,
            },
            data: {
                title,
                description,
                location,
                image,
                startDateTime,
                endDateTime,
                reservationLimit,
                isNoLimit,
                url,
                //...event,
                category: { connect: { id: eventToUpdate.categoryId } },
                owner: { connect: { id: userId } },
            },
            include: {
                category: true,
                owner: true,
            },
        })
        revalidatePath(path)

        return JSON.parse(JSON.stringify(newEvent))
    } catch (error) {
        handleError(error)
    }
}

export async function deleteEvent({ eventId, path }: DeleteEventParams) {
    try {
        const eventToDelete = await prisma.event.delete({
            where: {
                id: eventId,
            },
        })
        if (eventToDelete) revalidatePath(path)
    } catch (error) {
        handleError(error)
    }
}

export async function getAllEvents({
    query,
    limit = 6,
    page,
    category,
}: GetAllEventsParams) {
    try {
        // const titleCondition = query
        //     ? { title: { $regex: query, $options: 'i' } }
        //     : {}
        // const categoryCondition = category
        //     ? await getCategoryByName(category)
        //     : null
        // const conditions = {
        //     $and: [
        //         titleCondition,
        //         categoryCondition ? { category: categoryCondition._id } : {},
        //     ],
        // }
        const skipAmount = (Number(page) - 1) * limit

        const eventsQuery = await prisma.event.findMany({
            where: {
                title: {
                    contains: query,
                },
                category: {
                    name: { contains: category },
                },
            },
            skip: skipAmount,
            take: limit,
            include: {
                category: true,
                owner: true,
            },
        })
        // console.log('o-----k')

        // const eventsQuery = Event.find(conditions)
        //     .sort({ createdAt: 'desc' })
        //     .skip(skipAmount)
        //     .limit(limit)

        const totalEvents = await prisma.event.count({
            where: {
                title: {
                    contains: query,
                },
                category: {
                    name: { contains: category },
                },
            },
        })

        // const events = eventsQuery.map((event) => {
        //     return JSON.parse(JSON.stringify(event))
        // })

        // const events = await populateEvent(eventsQuery)
        // const eventsCount = await Event.countDocuments(conditions)
        return {
            data: JSON.parse(JSON.stringify(eventsQuery)),
            totalPages: Math.ceil(totalEvents / limit),
        }
    } catch (error) {
        handleError(error)
    }
}

export async function getEventsByUser({
    userId,
    limit = 6,
    page,
}: GetEventsByUserParams) {
    try {
        const skipAmount = (Number(page) - 1) * limit

        const eventsQuery = await prisma.event.findMany({
            where: {
                userId: userId,
            },
            skip: skipAmount,
            take: limit,
            include: {
                category: true,
                owner: true,
            },
        })

        // const eventsQuery = Event.find(conditions)
        //     .sort({ createdAt: 'desc' })
        //     .skip(skipAmount)
        //     .limit(limit)

        const totalEvents = await prisma.event.count({
            where: {
                owner: {
                    id: { equals: userId },
                },
            },
        })

        // const events = eventsQuery.map((event) => {
        //     return JSON.parse(JSON.stringify(event))
        // })

        // const events = await populateEvent(eventsQuery)
        // const eventsCount = await Event.countDocuments(conditions)
        return {
            data: JSON.parse(JSON.stringify(eventsQuery)),
            totalPages: Math.ceil(totalEvents / limit),
        }
    } catch (error) {
        handleError(error)
    }
}

export async function getRelatedEventsByCategory({
    categoryId,
    eventId,
    limit = 3,
    page = 1,
}: GetRelatedEventsByCategoryParams) {
    try {
        const skipAmount = (Number(page) - 1) * limit

        const eventsQuery = await prisma.event.findMany({
            where: {
                NOT: {
                    id: eventId,
                },
                // id: {
                //     equals: eventId,
                // },
                AND: [{ category: { id: categoryId } }],
            },
            skip: skipAmount,
            take: limit,
            include: {
                category: true,
                owner: true,
            },
        })

        const totalEvents = await prisma.event.count({
            where: {
                id: {
                    equals: eventId,
                },
                AND: [{ category: { id: categoryId } }],
            },
        })

        return {
            data: JSON.parse(JSON.stringify(eventsQuery)),
            totalPages: Math.ceil(totalEvents / limit),
        }
    } catch (error) {
        handleError(error)
    }
}

export async function getEventById(eventId: string) {
    try {
        const eventQuery = await prisma.event.findFirst({
            where: {
                id: { equals: eventId },
            },
            include: {
                category: true,
                owner: true,
            },
        })
        if (!eventQuery) throw new Error('Event not found')

        return JSON.parse(JSON.stringify(eventQuery))
    } catch (error) {
        handleError(error)
    }
}
