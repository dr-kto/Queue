import { NextResponse } from 'next/server'

import getCurrentUser from '@/lib/actions/getCurrentUser'
import { pusherServer } from '@/lib/pusher'
import prisma from '@/lib/prisma'

export async function POST(request: Request) {
    try {
        const currentUser = await getCurrentUser()
        const body = await request.json()
        const { message, image, chatId } = body

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const newMessage = await prisma.message.create({
            include: {
                seen: true,
                sender: true,
            },
            data: {
                body: message,
                image: image,
                chat: {
                    connect: { id: chatId },
                },
                sender: {
                    connect: { id: currentUser.id },
                },
                seen: {
                    connect: {
                        id: currentUser.id,
                    },
                },
            },
        })

        const updatedChat = await prisma.chat.update({
            where: {
                id: chatId,
            },
            data: {
                lastMessageAt: new Date(),
                messages: {
                    connect: {
                        id: newMessage.id,
                    },
                },
            },
            include: {
                users: true,
                messages: {
                    include: {
                        seen: true,
                    },
                },
            },
        })

        await pusherServer.trigger(chatId, 'messages:new', newMessage)

        const lastMessage =
            updatedChat.messages[updatedChat.messages.length - 1]

        updatedChat.users.map((user) => {
            pusherServer.trigger(user.email!, 'chat:update', {
                id: chatId,
                messages: [lastMessage],
            })
        })

        return NextResponse.json(newMessage)
    } catch (error) {
        console.log(error, 'ERROR_MESSAGES')
        return new NextResponse('Error', { status: 500 })
    }
}
