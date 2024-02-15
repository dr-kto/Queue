import bcrypt from 'bcrypt'

import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const body = await request.json()
    const { email, name, password } = body
    const image = '/assets/images/placeholderUser.jpg'
    // const hashedPassword = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password,
            image,
        },
    })

    return NextResponse.json(user)
}
