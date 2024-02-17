// import React, { useEffect } from 'react'
// import { loadStripe } from '@stripe/stripe-js'

// import { IEvent } from '@/lib/database/models/event.model'
'use client'
import { Button } from '../ui/button'
import { isAlreadyOrdered } from '@/lib/actions/get.order.actions'
import { Event } from '@prisma/client'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FullEventType } from '@/types'
import axios from 'axios'

// loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const Checkout = ({
    event,
    userId,
}: {
    event: FullEventType
    userId: string
}) => {
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

    const router = useRouter()

    async function onSubmit() {
        const order = {
            eventId: event.id,
            userId: userId,
            createdAt: new Date(),
        }
        console.log(
            'bidurino',
            event?.reservationLimit,
            'monokana',
            event?.orders.length
        )
        if (event?.reservationLimit) {
            if (Number(event?.reservationLimit) >= event?.orders.length) {
                console.log(
                    'bidurino',
                    event?.reservationLimit,
                    'monokara',
                    event?.orders.length
                )
                axios.post('/api/event/order', order).then(() => {
                    router.push(`/profile`)
                    // router.push(`/event/${event.id}?success=true`)
                })
            }
        } else if (event.isNoLimit) {
            axios.post('/api/event/order', order).then(() => {
                router.push(`/profile`)
                // router.push(`/event/${event.id}?success=true`)
            })
        }
        // const newOrder = await createEventOrder(order).then((callback) => {
        //     console.log(callback, 'yooooooooooooo')
        //     // router.push('/')
        // })
    }

    async function l() {
        const i = await isAlreadyOrdered({ eventId: event.id, userId })
        setAlreadyOrdered(i!)
    }

    return (
        <form action={onSubmit} method="post">
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
