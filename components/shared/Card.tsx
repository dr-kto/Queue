import { formatDateTime } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { DeleteConfirmation } from './DeleteConfirmation'
import getCurrentUser from '@/lib/actions/getCurrentUser'
import { Event } from '@prisma/client'
import clsx from 'clsx'

type CardProps = {
    event: Event
    hasOrderLink?: boolean
    hidePrice?: boolean
}

const Card = async ({ event, hasOrderLink, hidePrice }: CardProps) => {
    // console.log(event)
    const currentUser = await getCurrentUser()
    const userId = currentUser?.id

    const isEventCreator = userId === event.userId

    return (
        <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
            <Link
                href={`/events/${event.id}`}
                style={{ backgroundImage: `url(${event.image})` }}
                className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500"
            />
            {/* IS EVENT CREATOR ... */}

            {isEventCreator && !hidePrice && (
                <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
                    <Link href={`/events/${event.id}/update`}>
                        <Image
                            src="/assets/icons/edit.svg"
                            alt="edit"
                            width={20}
                            height={20}
                        />
                    </Link>

                    <DeleteConfirmation eventId={event.id} />
                </div>
            )}

            <div className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4">
                {!hidePrice && (
                    <div className="flex gap-2">
                        <span className="p-semibold-14 rounded-full bg-green-100 px-4 py-1 text-green-60">
                            {event.isNoLimit
                                ? 'No limit'
                                : `${event.reservationLimit}`}
                        </span>
                        <p
                            className={clsx(
                                `p-semibold-14  rounded-full bg-grey-500/10 px-4 py-1 text-grey-500 `,
                                // @ts-ignore
                                event.category.name.length > 20 &&
                                    'w-min line-clamp-1'
                            )}
                        >
                            {/* 
                            // @ts-ignore */}
                            {event.category.name}
                        </p>
                    </div>
                )}

                <p className="p-medium-16 p-medium-18 text-grey-500">
                    {formatDateTime(event.startDateTime).dateTime}
                </p>

                <Link href={`/events/${event.id}`}>
                    <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black">
                        {event.title}
                    </p>
                </Link>

                <div className="flex-between w-full">
                    <p className="p-medium-14 md:p-medium-16 text-grey-600">
                        {/* 
                            // @ts-ignore */}
                        {event.owner.name}
                    </p>

                    {hasOrderLink && (
                        <Link
                            href={`/orders?eventId=${event.id}`}
                            className="flex gap-2"
                        >
                            <p className="text-primary-500">Orders Detail</p>
                            <Image
                                src="/assets/icons/arrow.svg"
                                alt="search"
                                width={10}
                                height={10}
                            />
                        </Link>
                    )}
                    {hidePrice && (
                        <Link
                            href={`/orders/my-order?eventId=${event.id}&userId=${userId}`}
                            className="flex gap-2"
                        >
                            <p className="text-primary-500">View Details</p>
                            <Image
                                src="/assets/icons/arrow.svg"
                                alt="search"
                                width={10}
                                height={10}
                            />
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Card
