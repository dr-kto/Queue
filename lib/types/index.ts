export type User = {
    id: string
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
    hashedPassword: string | null
    createdAt: Date
    updatedAt: Date
    conversationIds: string[]
    seenMessageIds: string[]
}

export type Message = {
    id: string
    body: string | null
    image: string | null
    createdAt: Date
    seenIds: string[]
    conversationId: string
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
