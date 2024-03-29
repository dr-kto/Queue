import getCurrentUser from '@/lib/actions/getCurrentUser'
import { NextResponse } from 'next/server'

import prisma from '@/lib/prisma'
import { pusherServer } from '@/lib/pusher'

interface IParams {
    chatId?: string
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {
    try {
        const { chatId } = params
        const currentUser = await getCurrentUser()

        if (!currentUser?.id) {
            return NextResponse.json(null)
        }

        const existingChat = await prisma.chat.findUnique({
            where: {
                id: chatId,
            },
            include: {
                users: true,
            },
        })

        if (!existingChat) {
            return new NextResponse('Invalid ID', { status: 400 })
        }

        const deletedChat = await prisma.chat.deleteMany({
            where: {
                id: chatId,
                userIds: {
                    hasSome: [currentUser.id],
                },
            },
        })

        existingChat.users.forEach((user) => {
            if (user.email) {
                pusherServer.trigger(user.email, 'Chat:remove', existingChat)
            }
        })
        //     // console.log(
        //     //     deletedChat,
        //     //     '---------------------------------------------------------------'
        //     // )

        return NextResponse.json({})
        return NextResponse.json(deletedChat)
    } catch (error) {
        return NextResponse.json(null)
    }
}
