import { useParams } from 'next/navigation'
import { useMemo } from 'react'
import { create } from 'zustand'
import { useEffect, useState } from 'react'
import { pusherClient } from '@/lib/pusher'
import { Channel, Members } from 'pusher-js'

// CHAT IS OPEN
export function useChat() {
    const params = useParams()

    const chatId = useMemo(() => {
        if (!params?.chatId) {
            return ''
        }

        return params.chatId as string
    }, [params?.chatId])

    const isOpen = useMemo(() => !!chatId, [chatId])

    return useMemo(
        () => ({
            isOpen,
            chatId,
        }),
        [isOpen, chatId]
    )
}

// ACTIVE LISTS
interface ActiveListStore {
    members: string[]
    add: (id: string) => void
    remove: (id: string) => void
    set: (ids: string[]) => void
}
export const useActiveList = create<ActiveListStore>((set) => ({
    members: [],
    add: (id) => set((state) => ({ members: [...state.members, id] })),
    remove: (id) =>
        set((state) => ({
            members: state.members.filter((memberId) => memberId !== id),
        })),
    set: (ids) => set({ members: ids }),
}))

// ACTIVE CHANNEL
export function useActiveChannel() {
    const { set, add, remove } = useActiveList()
    const [activeChannel, setActiveChannel] = useState<Channel | null>(null)

    useEffect(() => {
        let channel = activeChannel

        if (!channel) {
            channel = pusherClient.subscribe('presence-messenger')
            setActiveChannel(channel)
        }

        channel.bind('pusher:subscription_succeeded', (members: Members) => {
            const initialMembers: string[] = []

            members.each((member: Record<string, any>) =>
                initialMembers.push(member.id)
            )
            set(initialMembers)
        })

        channel.bind('pusher:member_added', (member: Record<string, any>) => {
            add(member.id)
        })

        channel.bind('pusher:member_removed', (member: Record<string, any>) => {
            remove(member.id)
        })

        return () => {
            if (activeChannel) {
                pusherClient.unsubscribe('presence-messenger')
                setActiveChannel(null)
            }
        }
    }, [activeChannel, set, add, remove])
}
