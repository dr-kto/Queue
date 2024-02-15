// import EventForm from '@/components/shared/EventForm'
// import { getEventById } from '@/lib/actions/event.actions'
// import { auth } from '@clerk/nextjs'

// type UpdatePostProps = {
//     params: {
//         id: string
//     }
// }

const page = () => {
    return <div>page</div>
}

export default page

// const UpdatePost = async ({ params: { id } }: UpdatePostProps) => {
//     const { sessionClaims } = auth()

//     const userId = sessionClaims?.userId as string
//     const event = await getEventById(id)

//     return (
//         <>
//             <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
//                 <h3 className="wrapper h3-bold text-center sm:text-left">
//                     Update Post
//                 </h3>
//             </section>

//             <div className="wrapper my-8">
//                 <EventForm
//                     type="Update"
//                     event={event}
//                     eventId={event._id}
//                     userId={userId}
//                 />
//             </div>
//         </>
//     )
// }

// export default UpdatePost
