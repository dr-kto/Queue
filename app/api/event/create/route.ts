import bcrypt from 'bcrypt'

import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const body = await request.json()
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
        categoryId,
        userId,
    } = body
    // const image = '/assets/images/placeholderUser.jpg'
    // const hashedPassword = await bcrypt.hash(password, 12)
    // console.log('chiki puki', body)
    const event = await prisma.event.create({
        data: {
            title: title,
            description: description,
            location: location,
            image: image,
            startDateTime: startDateTime,
            endDateTime: endDateTime,
            reservationLimit: reservationLimit,
            isNoLimit: isNoLimit,
            url: url,
            categoryId: categoryId,
            userId: userId,
            // category: { connect: { id: categoryId } },
            // owner: { connect: { id: userId } },
        },
    })
    // console.log('yeah!')

    return NextResponse.json(event)
}
