// ====== USER PARAMS
import { User, Event, Category } from '@prisma/client'
import { string } from 'zod'

// export type Event = {
//     id: string
//     title: string
//     description: string
//     location: string
//     image: string
//     createdAt: Date
//     startDateTime: Date
//     endDateTime: Date
//     reservationLimit: string
//     isNoLimit: boolean
//     url: string
//     userId: string
//     categoryId: string
// }

export type Post = {
    id: string
    userId: string | null
    caption: string | null
    tags: string | null
    image: string
    video: string | null
    file: string | null
    location: string | null
    createdAt: Date
    owner: User
    saves: Saves
}

export type Saves = {
    id: string
    userId: string | null
    user: User | null
    postId: string | null
    post: Post[]
}

export type Message = {
    id: string
    body: string | null
    image: string | null
    createdAt: Date
    seenIds: string[]
    chatId: string
    senderId: string
}

export type Chat = {
    id: string
    createdAt: Date
    lastMessageAt: Date
    name: string | null
    isGroup: boolean | null
    messagesIds: string[]
    userIds: string[]
}

export type FullMessageType = Message & {
    sender: User
    seen: User[]
}

export type FullChatType = Chat & {
    users: User[]
    messages: FullMessageType[]
}

export type Owner = User & {}

export type Events = Event & {}

export type FullEventType = Events & {
    owner: Owner
    category: Category
}
// -----------------------

// -----------------------

export type CreateUserParams = {
    name: string
    username: string
    email: string
    image: string
}

export type UpdateUserParams = {
    name: string
    username: string
    image: string
}

// ====== EVENT PARAMS
export type CreateEventParams = {
    userId: string
    eventToCreate: Event
    path: string
}

export type UpdateEventParams = {
    userId: string
    eventToUpdate: Event
    path: string
}

export type DeleteEventParams = {
    eventId: string
    path: string
}

export type GetAllEventsParams = {
    query: string
    category: string
    limit: number
    page: number
}
export type GetAllUsersParams = {
    query: string
    userId?: string
    category: string
    limit: number
    page: number
}

export type GetEventsByUserParams = {
    userId?: string
    limit?: number
    page: number
}

export type GetRelatedEventsByCategoryParams = {
    categoryId: string
    eventId: string
    limit?: number
    page: number | string
}

// export type Event = {
//     _id: string
//     title: string
//     description: string
//     price: string
//     isFree: boolean
//     imageUrl: string
//     location: string
//     startDateTime: Date
//     endDateTime: Date
//     url: string
//     organizer: {
//         _id: string
//         firstName: string
//         lastName: string
//     }
//     category: {
//         _id: string
//         name: string
//     }
// }

// ====== CATEGORY PARAMS
export type CreateCategoryParams = {
    categoryName: string
}

// ====== ORDER PARAMS
export type CheckoutOrderParams = {
    eventTitle: string
    eventId: string
    price: string
    isFree: boolean
    buyerId: string
}

export type CreateOrderParams = {
    bookerId: string
    eventId: string
    // totalAmount: string
}

export type CreateEventOrderParams = {
    userId: string
    eventId: string
    // totalAmount: string
}
export type isAlreadyOrderedParams = {
    userId: string
    eventId: string
    // totalAmount: string
}
export type GetOrdersByEventParams = {
    eventId: string
    searchString: string
}

export type GetOrdersByUserParams = {
    userId: string | null
    limit?: number
    page: string | number | null
}

// ====== URL QUERY PARAMS
export type UrlQueryParams = {
    params: string
    key: string
    value: string | null
}

export type RemoveUrlQueryParams = {
    params: string
    keysToRemove: string[]
}

export type SearchParamProps = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}
export type SearchEventParamProps = {
    params: { eventId: string }
    searchParams: { [key: string]: string | string[] | undefined }
}
export type SearchPostParamProps = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}
export type SearchProfileParamProps = {
    params: { profileId: string }
    searchParams: { [key: string]: string | string[] | undefined }
}
export type SearchPeopleParamProps = {
    params: { profileId: string }
    searchParams: { [key: string]: string | string[] | undefined }
}
