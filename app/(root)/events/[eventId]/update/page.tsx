import EventForm from '@/components/shared/EventForm'
import { getEventById } from '@/lib/actions/get.event.actions'
import getCurrentUser from '@/lib/actions/getCurrentUser'
import { getSession } from 'next-auth/react'
// import { auth } from '@clerk/nextjs'

type UpdateEventProps = {
    params: {
        eventId: string
    }
}

const UpdateEvent = async ({ params: { eventId } }: UpdateEventProps) => {
    const currentUser = await getCurrentUser()

    const userId = currentUser?.id as string
    const event = await getEventById(eventId)

    return (
        <>
            <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
                <h3 className="wrapper h3-bold text-center sm:text-left">
                    Update Event
                </h3>
            </section>

            <div className="wrapper my-8">
                <EventForm
                    type="Update"
                    event={event}
                    eventId={event.id}
                    userId={userId}
                />
            </div>
        </>
    )
}

export default UpdateEvent
