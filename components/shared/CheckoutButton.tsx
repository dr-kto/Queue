// 'use client'

// import { IEvent } from '@/lib/database/models/event.model'
// import { SignedIn, SignedOut, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import Checkout from './Checkout'
import { Event } from '@prisma/client'
import { FullEventType } from '@/types'

import getCurrentUser from '@/lib/actions/getCurrentUser'
import { useSession } from 'next-auth/react'
import SignedIn from '../auth/SignedIn'
import SignedOut from '../auth/SignedOut'

interface CheckoutButtonProps {
    event: FullEventType
    userId: string
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ event, userId }) => {
    // const { user } = useUser()
    // const userId = user?.publicMetadata.userId as string

    // const currentUser = await getCurrentUser()
    // const userId = currentUser?.id as string

    const hasEventFinished = new Date(event.endDateTime) < new Date()

    return (
        <div className="flex items-center gap-3">
            {hasEventFinished ? (
                <p className="p-2 text-red-400">
                    Sorry, tickets are no longer available.
                </p>
            ) : (
                <>
                    <SignedIn>
                        <Checkout event={event} userId={userId} />
                    </SignedIn>

                    <SignedOut>
                        <Button
                            asChild
                            className="button rounded-full"
                            size="lg"
                        >
                            <Link href="/login">Get Tickets</Link>
                        </Button>
                    </SignedOut>
                </>
            )}
        </div>
    )
}

export default CheckoutButton
