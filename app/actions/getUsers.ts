// import prisma from "@/app/libs/prismadb";
import getSession from './getSession'

const getUsers = async () => {
    const session = await getSession()

    //   if (!session?.user?.email) {
    //     return [];
    //   }

    //   try {
    //     const users = await prisma.user.findMany({
    //       orderBy: {
    //         createdAt: 'desc'
    //       },
    //       where: {
    //         NOT: {
    //           email: session.user.email
    //         }
    //       }
    //     });
    const users = [
        {
            id: '65c329c6c1dd02f0787d1164',
            name: 'Bekzat',
            email: 'bekzat@mail.ru',
            emailVerified: null,
            image: null,
            hashedPassword:
                '$2b$12$XkHTcaF2FX6TSq0crCtttO4UCXvO./d41eIdHhtNRFiBdAOC3iTfq',
            createdAt: new Date(),
            updatedAt: new Date(),
            conversationIds: [
                '65c329d2c1dd02f0787d1165',
                '65c36117a8f00d456d0b832e',
            ],
            seenMessageIds: ['65c329f1c1dd02f0787d1166'],
        },
        {
            id: '65c26d49c9d80543c223fcb6',
            name: 'Kuanysh',
            email: 'kuanysh@gmail.com',
            emailVerified: null,
            image: null,
            hashedPassword:
                '$2b$12$CeV0AQzNNtdgPtcXv7agY.U2cAYhMVMbN3XJrum/mKyN46vWitAsK',
            createdAt: new Date(),
            updatedAt: new Date(),
            conversationIds: [
                '65c26d72c9d80543c223fcb7',
                '65c2ff63c9d80543c223fcb8',
                '65c329d2c1dd02f0787d1165',
                '65c32a53c1dd02f0787d1169',
                '65c34ebfa8f00d456d0b832c',
                '65c34edda8f00d456d0b832d',
                '65c36117a8f00d456d0b832e',
                '65c37e04e0d54284619df2c0',
                '65c37e65e0d54284619df2c2',
            ],
            seenMessageIds: [
                '65c30404c9d80543c223fcb9',
                '65c30412c9d80543c223fcba',
                '65c317afc9d80543c223fcbb',
                '65c329f1c1dd02f0787d1166',
                '65c32a1ec1dd02f0787d1167',
                '65c32a2ec1dd02f0787d1168',
                '65c36129a8f00d456d0b832f',
                '65c3617ca8f00d456d0b8330',
            ],
        },
        {
            id: '65c1ea5be5d0fa5c66137fc8',
            name: 'Mukakos',
            email: 'mukakos@gmail.com',
            emailVerified: null,
            image: null,
            hashedPassword:
                '$2b$12$AxCJEUbedaQxHNZ5U6QexO.ST.Rak/3O1XVS6G2C0OSzE0jtiojgW',
            createdAt: new Date(),
            updatedAt: new Date(),
            conversationIds: [
                '65c1ea66e5d0fa5c66137fc9',
                '65c1fb2ee5d0fa5c66137fce',
                '65c26c49c9d80543c223fcb5',
                '65c26d72c9d80543c223fcb7',
                '65c34ebfa8f00d456d0b832c',
                '65c34edda8f00d456d0b832d',
                '65c36117a8f00d456d0b832e',
                '65c37e65e0d54284619df2c2',
                '65c392b1978e72c4c2e4b42a',
            ],
            seenMessageIds: [],
        },
        {
            id: '65c1e234e5d0fa5c66137fc5',
            name: 'Dias Bakhtiyarov',
            email: 'dispatcher.dias@gmail.com',
            emailVerified: null,
            image: 'https://lh3.googleusercontent.com/a/ACg8ocJa7v48d4TZ3uWsKa_jkb87SnG159Rscmcw3v7wBtrV=s96-c',
            hashedPassword: null,
            createdAt: new Date(),
            updatedAt: new Date(),
            conversationIds: [
                '65c1e665e5d0fa5c66137fc7',
                '65c1ea66e5d0fa5c66137fc9',
                '65c1fa13e5d0fa5c66137fcc',
                '65c26bf0c9d80543c223fcb4',
                '65c3228fc9d80543c223fcbd',
                '65c32853c1dd02f0787d1161',
                '65c32a53c1dd02f0787d1169',
            ],
            seenMessageIds: [
                '65c322aec9d80543c223fcbe',
                '65c3288bc1dd02f0787d1162',
                '65c3496fc1dd02f0787d116a',
            ],
        },
        {
            id: '65c1e1dce5d0fa5c66137fc3',
            name: 'Main',
            email: 'bakhtrv.dias@gmail.com',
            emailVerified: null,
            image: 'https://lh3.googleusercontent.com/a/ACg8ocL6UmUEwpaEoN4MwgXf3mHDO2o5d6tBJkgqa9ow6uOemA=s96-c',
            hashedPassword: null,
            createdAt: new Date(),
            updatedAt: new Date(),
            conversationIds: [
                '65c1e665e5d0fa5c66137fc7',
                '65c1facde5d0fa5c66137fcd',
                '65c26bdac9d80543c223fcb3',
                '65c3228fc9d80543c223fcbd',
                '65c34ebfa8f00d456d0b832c',
                '65c34edda8f00d456d0b832d',
                '65c37e04e0d54284619df2c0',
                '65c37e65e0d54284619df2c2',
                '65c392b1978e72c4c2e4b42a',
            ],
            seenMessageIds: [
                '65c322aec9d80543c223fcbe',
                '65c3288bc1dd02f0787d1162',
                '65c3496fc1dd02f0787d116a',
                '65c37e24e0d54284619df2c1',
            ],
        },
    ]

    return users
    //   } catch (error: any) {
    //     return [];
    //   }
}

export default getUsers
