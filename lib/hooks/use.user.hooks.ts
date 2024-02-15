import { useParams, usePathname } from 'next/navigation'
import { useMemo } from 'react'
import { useSession } from 'next-auth/react'
import { FullChatType } from '@/types'
import { User } from '@prisma/client'
import { useChat } from './use.chat.hooks'

// PROFILE
export function useProfile() {
    const params = useParams()

    const profileId = useMemo(() => {
        if (!params?.profileId) {
            return ''
        }

        return params.profileId as string
    }, [params?.profileId])

    const isOpen = useMemo(() => !!profileId, [profileId])

    return useMemo(
        () => ({
            isOpen,
            profileId,
        }),
        [isOpen, profileId]
    )
}

// OTHER USER
export function useOtherUser(chat: FullChatType | { users: User[] }) {
    const session = useSession()

    const otherUser = useMemo(() => {
        const currentUserEmail = session.data?.user?.email

        const otherUser = chat.users.filter(
            (user) => user.email !== currentUserEmail
        )

        return otherUser[0]
    }, [session.data?.user?.email, chat.users])

    return otherUser
}

export async function useChatOpen() {
    return useChat() || usePathname() === '/chats'
}
