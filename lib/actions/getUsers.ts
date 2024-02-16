import prisma from '@/lib/prisma'
import getSession from './getSession'

const getUsers = async () => {
    const session = await getSession()

    if (!session?.user?.email) {
        return []
    }

    // console.log(session.user, 'heyyaaaaaa')

    try {
        const users = await prisma.user.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            where: {
                NOT: {
                    email: session.user.email as string,
                },
            },
        })

        const i = await prisma.user.findMany({
            where: {
                email: {
                    contains: '@',
                },
            },
        })

        return users
    } catch (error: any) {
        return []
    }
}

export default getUsers
