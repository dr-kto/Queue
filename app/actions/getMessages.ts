// import prisma from '@/app/libs/prismadb'

import { Message } from '../types'

const getMessages = async (conversationId: string) => {
    // try {
    //     const messages = await prisma.message.findMany({
    //         where: {
    //             conversationId: conversationId,
    //         },
    //         include: {
    //             sender: true,
    //             seen: true,
    //         },
    //         orderBy: {
    //             createdAt: 'asc',
    //         },
    //     })
    const messages = [] as any[]

    return messages
    // } catch (error: any) {
    //     return []
    // }
}

export default getMessages
