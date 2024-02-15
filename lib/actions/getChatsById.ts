import prisma from '@/lib/prisma'
import getCurrentUser from './getCurrentUser'

const getChatsById = async (chatId: string) => {
    try {
        const currentUser = await getCurrentUser()

        if (!currentUser?.email) {
            return null
        }

        const chat = await prisma.chat.findUnique({
            where: {
                id: chatId,
            },
            include: {
                users: true,
            },
        })
        // const conversation = {
        //     id: '65c32853c1dd02f0787d1161',
        //     createdAt: new Date(),
        //     lastMessageAt: new Date(),
        //     name: null,
        //     isGroup: null,
        //     messagesIds: [],
        //     userIds: ['65c1e234e5d0fa5c66137fc5', '65c1ef4ee5d0fa5c66137fca'],
        //     users: [
        //         {
        //             id: '65c1e234e5d0fa5c66137fc5',
        //             name: 'Dias Bakhtiyarov',
        //             email: 'dispatcher.dias@gmail.com',
        //             emailVerified: null,
        //             image: 'https://lh3.googleusercontent.com/a/ACg8ocJa7v48d4TZ3uWsKa_jkb87SnG159Rscmcw3v7wBtrV=s96-c',
        //             hashedPassword: null,
        //             createdAt: new Date(),
        //             updatedAt: new Date(),
        //             conversationIds: [
        //                 '65c1e665e5d0fa5c66137fc7',
        //                 '65c1ea66e5d0fa5c66137fc9',
        //                 '65c1fa13e5d0fa5c66137fcc',
        //                 '65c26bf0c9d80543c223fcb4',
        //                 '65c3228fc9d80543c223fcbd',
        //                 '65c32853c1dd02f0787d1161',
        //                 '65c32a53c1dd02f0787d1169',
        //             ],
        //             seenMessageIds: [
        //                 '65c322aec9d80543c223fcbe',
        //                 '65c3288bc1dd02f0787d1162',
        //                 '65c3496fc1dd02f0787d116a',
        //             ],
        //         },
        //         {
        //             id: '65c1ef4ee5d0fa5c66137fca',
        //             name: 'Dias Bakhtiyarov',
        //             email: 'rugaru01@gmail.com',
        //             emailVerified: null,
        //             image: 'https://lh3.googleusercontent.com/a/ACg8ocIHS4ShDvcR9gH7Cuh7iRn7uLGhx_2XO0TwY707fRWK=s96-c',
        //             hashedPassword: null,
        //             createdAt: new Date(),
        //             updatedAt: new Date(),
        //             conversationIds: [
        //                 '65c1fa13e5d0fa5c66137fcc',
        //                 '65c1facde5d0fa5c66137fcd',
        //                 '65c1fb2ee5d0fa5c66137fce',
        //                 '65c26bdac9d80543c223fcb3',
        //                 '65c26bf0c9d80543c223fcb4',
        //                 '65c26c49c9d80543c223fcb5',
        //                 '65c2ff63c9d80543c223fcb8',
        //                 '65c32853c1dd02f0787d1161',
        //                 '65c36117a8f00d456d0b832e',
        //             ],
        //             seenMessageIds: [
        //                 '65c3217ac9d80543c223fcbc',
        //                 '65c3617ca8f00d456d0b8330',
        //                 '65cb6521123a51f77a9ef867',
        //             ],
        //         },
        //     ],
        // }

        return chat
    } catch (error: any) {
        console.log(error, 'SERVER_ERROR')
        return null
    }
}

export default getChatsById
