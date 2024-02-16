'use client'
import getSignedStatus from '@/lib/actions/getSignedStatus'

interface SignedInProps {
    children?: React.ReactNode
}

const SignedIn: React.FC<SignedInProps> = ({ children }) => {
    const isSignedIn = getSignedStatus()
    return <>{isSignedIn ? <>{children}</> : <></>}</>
}

export default SignedIn
