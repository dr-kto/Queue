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
import { getEventById } from '@/lib/actions/get.event.actions'

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
    const [isOwner, setIsOwner] = useState(false)

    const router = useRouter()

    async function onSubmit() {
        const order = {
            eventId: event.id,
            userId: userId,
            createdAt: new Date(),
        }
        // console.log(
        //     'bidurino',
        //     event?.reservationLimit,
        //     'monokana',
        //     event?.orders.length
        // )
        if (!isOwner) {
            if (event?.reservationLimit) {
                console.log(event.reservationLimit, ' kk ', event.orders.length)
                if (Number(event?.reservationLimit) >= event?.orders.length) {
                    // console.log(
                    //     'bidurino',
                    //     event?.reservationLimit,
                    //     'monokara',
                    //     event?.orders.length
                    // )
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
        }

        // const newOrder = await createEventOrder(order).then((callback) => {
        //     console.log(callback, 'yooooooooooooo')
        //     // router.push('/')
        // })
    }

    async function l() {
        console.log('kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk', userId)
        const i = await isAlreadyOrdered({ eventId: event.id, userId })
        // @ts-ignore
        setAlreadyOrdered(i)

        const eventById = await getEventById(event.id)

        // console.log(eventById.owner.id, 'kkkk', userId, alreadyOrdered)

        if (eventById.owner.id === userId) {
            setIsOwner(true)
        }
        // console.log(i, 'yooooooooooooo')
    }
    l()

    return (
        <form action={onSubmit} method="post">
            {alreadyOrdered || isOwner ? (
                <Button
                    type="submit"
                    role="link"
                    size="lg"
                    className="button sm:w-fit"
                >
                    <Link
                        href={
                            isOwner
                                ? `/orders?eventId=${event.id}`
                                : `/orders/my-order/?eventId=${event.id}&userId=${userId}`
                        }
                    >
                        {isOwner ? `Orders Detail` : `View Ticket`}
                    </Link>
                </Button>
            ) : (
                <Button
                    type="submit"
                    role="link"
                    size="lg"
                    className="button sm:w-fit"
                >
                    {event.isNoLimit ? 'Get Ticket' : 'Book Ticket'}
                </Button>
            )}
        </form>
    )
}

export default Checkout
