import prisma from '@/lib/prisma'
import getSession from './getSession'
import { GetAllUsersParams } from '@/types'

export async function getAllUsers({
    query,
    userId,
    category,
    limit = 6,
    page,
}: GetAllUsersParams) {
    const session = await getSession()

    // console.log(session)

    if (!session?.user?.email) {
        return []
    }

    try {
        const users = await prisma.user.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            where: {
                NOT: {
                    email: session.user.email,
                },
            },
        })

        return users
    } catch (error: any) {
        return []
    }
}
