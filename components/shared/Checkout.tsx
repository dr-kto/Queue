// import React, { useEffect } from 'react'
// import { loadStripe } from '@stripe/stripe-js'

// import { IEvent } from '@/lib/database/models/event.model'
'use client'
import { Button } from '../ui/button'
import {
    checkoutOrder,
    isAlreadyOrdered,
} from '@/lib/actions/get.order.actions'
import { Event } from '@prisma/client'
import Link from 'next/link'
import { useMemo, useState } from 'react'

// loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const Checkout = ({ event, userId }: { event: Event; userId: string }) => {
    // useEffect(() => {
    //     // Check to see if this is a redirect back from Checkout
    //     const query = new URLSearchParams(window.location.search)
    //     if (query.get('success')) {
    //         console.log('Order placed! You will receive an email confirmation.')
    //     }

    //     if (query.get('canceled')) {
    //         console.log(
    //             'Order canceled -- continue to shop around and checkout when you’re ready.'
    //         )
    //     }
    // }, [])

    // const alreadyOrdered = await isAlreadyOrdered({ eventId: event.id, userId })

    // console.log(status)

    const [alreadyOrdered, setAlreadyOrdered] = useState(false)

    const onCheckout = async () => {
        const order = {
            eventId: event.id,
            bookerId: userId,
        }

        await checkoutOrder(order)
    }

    async function l() {
        setAlreadyOrdered(await isAlreadyOrdered({ eventId: event.id, userId }))
    }

    return (
        <form action={onCheckout} method="post">
            {alreadyOrdered ? (
                <Button
                    type="submit"
                    role="link"
                    size="lg"
                    className="button sm:w-fit"
                >
                    <Link href="/profile">View Ticket</Link>
                </Button>
            ) : (
                <Button
                    type="submit"
                    role="link"
                    size="lg"
                    className="button sm:w-fit"
                >
                    {event.isNoLimit ? 'Get Ticket' : 'Buy Ticket'}
                </Button>
            )}
        </form>
    )
}

export default Checkout
