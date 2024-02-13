// // import prisma from "@/app/libs/prismadb";
// import getSession from "./getSession";

export type User = {
    id: string
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
    hashedPassword: string | null
    createdAt: Date
    updatedAt: Date
    conversationIds: string[]
    seenMessageIds: string[]
}

const getCurrentUser = async () => {
    const data: User = {
        id: '65c1ef4ee5d0fa5c66137fca',
        name: 'Dias Bakhtiyarov',
        email: 'rugaru01@gmail.com',
        emailVerified: null,
        image: 'https://lh3.googleusercontent.com/a/ACg8ocIHS4ShDvcR9gH7Cuh7iRn7uLGhx_2XO0TwY707fRWK=s96-c',
        hashedPassword: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        conversationIds: [
            '65c1fa13e5d0fa5c66137fcc',
            '65c1facde5d0fa5c66137fcd',
            '65c1fb2ee5d0fa5c66137fce',
            '65c26bdac9d80543c223fcb3',
            '65c26bf0c9d80543c223fcb4',
            '65c26c49c9d80543c223fcb5',
            '65c2ff63c9d80543c223fcb8',
            '65c32853c1dd02f0787d1161',
            '65c36117a8f00d456d0b832e',
        ],
        seenMessageIds: ['65c3217ac9d80543c223fcbc'],
    }

    return data
}

//   try {
//     const session = await getSession();

//     if (!session?.user?.email) {
//       return null;
//     }

//     const currentUser = await prisma.user.findUnique({
//       where: {
//         email: session.user.email as string
//       }
//     });

//     if (!currentUser) {
//       return null;
//     }

//     return currentUser;
//   } catch (error: any) {
//     return null;
//   }
// }

export default getCurrentUser
