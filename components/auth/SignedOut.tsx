'use client'
import getSignedStatus from '@/lib/actions/getSignedStatus'

interface SignedOutProps {
    children?: React.ReactNode
}

const SignedOut: React.FC<SignedOutProps> = ({ children }) => {
    const isSignedIn = getSignedStatus()
    return <>{!isSignedIn ? <>{children}</> : <></>}</>
}

export default SignedOut
