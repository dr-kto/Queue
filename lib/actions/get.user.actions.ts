import prisma from '@/lib/prisma'
import getSession from './getSession'
import { GetAllUsersParams } from '@/types'
// {
//     placeholder = 'Search title...',
//     urlParamName = 'query',
// }: {
//     placeholder?: string
//     urlParamName?: string
// }
export async function getAllUsers({
    query = '',
    userId = '',
    category = '',
    location = '',
    limit = 6,
    page = 1,
}: GetAllUsersParams) {
    // const session = await getSession()

    // console.log(session)

    // if (!session?.user?.email) {
    //     return []
    // }

    // const currentUser = await prisma.user.findFirst({
    //     where: {
    //         id: userId,
    //     },
    // })

    if ((query.length > 0, location.length > 0)) {
        page = 1
    }

    const skipAmount = (Number(page) - 1) * limit

    try {
        const users = await prisma.user.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            where: {
                name: {
                    contains: query,
                    mode: 'insensitive',
                },
                // location: location,
                location: {
                    contains: location,
                    mode: 'insensitive',
                },
                NOT: {
                    id: userId,
                },
            },
            skip: skipAmount,
            take: limit,
        })

        const totalEvents = await prisma.user.count({
            where: {
                name: {
                    contains: query,
                    mode: 'insensitive',
                },
                // location: location,
                location: {
                    contains: location,
                    mode: 'insensitive',
                },
                NOT: {
                    id: userId,
                },
            },
        })

        return {
            data: JSON.parse(JSON.stringify(users)),
            totalPages: Math.ceil(totalEvents / limit),
        }
    } catch (error: any) {
        return {}
    }
}
