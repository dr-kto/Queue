import prisma from '@/lib/prisma'

import { Message } from '@/types'

const getMessages = async (chatId: string) => {
    try {
        const messages = await prisma.message.findMany({
            where: {
                chatId: chatId,
            },
            include: {
                sender: true,
                seen: true,
            },
            orderBy: {
                createdAt: 'asc',
            },
        })
        // const messages = [] as any[]

        return messages
    } catch (error: any) {
        return []
    }
}

export default getMessages
