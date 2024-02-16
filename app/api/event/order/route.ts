import bcrypt from 'bcrypt'

import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const body = await request.json()
    const { eventId, userId, createdAt } = body
    // console.log('chiki puki', body)
    // const image = '/assets/images/placeholderUser.jpg'
    // const hashedPassword = await bcrypt.hash(password, 12)
    // console.log('chiki puki', body)
    const order = await prisma.order.create({
        data: {
            createdAt,
            bookerId: userId,
            eventId: eventId,
            // DO NOT USE CONNECT VIA CREATING WITH PRISMA AND USE ROUTES EITHER HOOKS OR ACTIONS
            // booker: { connect: { id: userId } },
            // event: { connect: { id: eventId } },
        },
    })
    // console.log('yeah!')

    return NextResponse.json(order)
}
