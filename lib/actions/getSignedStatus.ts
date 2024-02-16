// 'use server'

import { useSession } from 'next-auth/react'
import getSession from './getSession'

const getSignedStatus = () => {
    const session = useSession()
    const isSignedIn = session?.status === 'authenticated'
    return isSignedIn
}
export default getSignedStatus
