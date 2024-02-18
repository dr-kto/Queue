// import CheckoutButton from '@/components/shared/CheckoutButton'
import CheckoutButton from '@/components/shared/CheckoutButton'
import Collection from '@/components/shared/Collection'
import {
    getEventById,
    getRelatedEventsByCategory,
} from '@/lib/actions/get.event.actions'
import getCurrentUser from '@/lib/actions/getCurrentUser'
import { formatDateTime } from '@/lib/utils'
import { SearchEventParamProps } from '@/types'
import Image from 'next/image'

const EventDetails = async ({
    params: { eventId },
    searchParams,
}: SearchEventParamProps) => {
    const event = await getEventById(eventId)
    const currentUser = await getCurrentUser()
    const userId = currentUser?.id as string
    // console.log({ event })
    const page = Number(searchParams?.page) || 1

    const limit = 3

    const relatedEvents = await getRelatedEventsByCategory({
        categoryName: event.category.name,
        eventId: event.id,
        limit: limit,
        page: page,
    })

    const ticketCount =
        Number(event.reservationLimit) - Number(event.orders.length)

    return (
        <>
            <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain">
                <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
                    {event.image && (
                        <Image
                            src={event.image}
                            alt="hero image"
                            width={1000}
                            height={1000}
                            className="h-full min-h-[300px] object-cover object-center"
                        />
                    )}

                    <div className="flex w-full flex-col gap-8 p-5 md:p-10">
                        <div className="flex flex-col gap-6">
                            <h2 className="h2-bold">{event.title}</h2>

                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                <div className="flex gap-3">
                                    <p className="p-bold-20 rounded-full bg-green-500/10 px-5 py-2 text-green-700">
                                        {event.isNoLimit
                                            ? 'No limit'
                                            : `${
                                                  ticketCount === 0
                                                      ? 'no'
                                                      : ticketCount
                                              } ticket available`}
                                    </p>
                                    <p className="p-medium-16 rounded-full bg-grey-500/10 px-4 py-2.5 text-grey-500">
                                        {event.category.name}
                                    </p>
                                </div>

                                <p className="p-medium-18 ml-2 mt-2 sm:mt-0">
                                    by{' '}
                                    <span className="text-primary-500">
                                        {event.owner.name}
                                    </span>
                                </p>
                            </div>
                        </div>

                        <CheckoutButton event={event} userId={userId} />

                        <div className="flex flex-col gap-5">
                            <div className="flex gap-2 md:gap-3">
                                <Image
                                    src="/assets/icons/calendar.svg"
                                    alt="calendar"
                                    width={32}
                                    height={32}
                                />
                                <div className="p-medium-16 lg:p-regular-20 flex flex-wrap items-center flex-col">
                                    <p>
                                        {
                                            formatDateTime(event.startDateTime)
                                                .dateOnly
                                        }{' '}
                                        -{' '}
                                        {
                                            formatDateTime(event.startDateTime)
                                                .timeOnly
                                        }
                                    </p>
                                    <p>
                                        {
                                            formatDateTime(event.endDateTime)
                                                .dateOnly
                                        }{' '}
                                        -{' '}
                                        {
                                            formatDateTime(event.endDateTime)
                                                .timeOnly
                                        }
                                    </p>
                                </div>
                            </div>

                            <div className="p-regular-20 flex items-center gap-3">
                                <Image
                                    src="/assets/icons/location.svg"
                                    alt="location"
                                    width={32}
                                    height={32}
                                />
                                <p className="p-medium-16 lg:p-regular-20">
                                    {event.location}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <p className="p-bold-20 text-grey-600">
                                What You'll Learn:
                            </p>
                            <p className="p-medium-16 lg:p-regular-18 whitespace-pre-line">
                                {event.description}
                            </p>
                            <a href={event.url}>
                                <p className="p-medium-16 lg:p-regular-18 truncate text-primary-500 underline">
                                    {event.url}
                                </p>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* EVENTS with the same category */}
            <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
                <h2 className="h2-bold">Related Events</h2>

                <Collection
                    data={relatedEvents?.data}
                    emptyTitle="No Events Found"
                    emptyStateSubtext="Come back later"
                    collectionType="All_Events"
                    limit={limit}
                    page={page}
                    totalPages={relatedEvents?.totalPages}
                />
            </section>
        </>
    )
}

export default EventDetails
