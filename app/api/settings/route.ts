import { NextResponse } from 'next/server'

import getCurrentUser from '@/lib/actions/getCurrentUser'
import prisma from '@/lib/prisma'

export async function POST(request: Request) {
    try {
        const currentUser = await getCurrentUser()
        const body = await request.json()
        const {
            name,
            username,
            status,
            bio,
            location,
            image,
            backgroundImage,
            password,
        } = body

        if (!currentUser?.id) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: currentUser.id,
            },
            data: {
                name: name,
                username: username,
                status: status,
                bio: bio,
                location: location,
                image: image,
                backgroudImage: backgroundImage,
                password: password,
            },
        })

        return NextResponse.json(updatedUser)
    } catch (error) {
        console.log(error, 'ERROR_MESSAGES')
        return new NextResponse('Error', { status: 500 })
    }
}
