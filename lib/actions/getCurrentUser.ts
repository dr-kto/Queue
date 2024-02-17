import prisma from '@/lib/prisma'
import getSession from './getSession'

const getCurrentUser = async () => {
    try {
        const session = await getSession()

        if (!session?.user?.email) {
            return null
        }
        console.log(session.user)

        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string,
            },
        })

        if (!currentUser) {
            return null
        }

        // console.log('brierwerwerw', currentUser)

        return currentUser
    } catch (error: any) {
        return null
    }
}

export default getCurrentUser
