'use client'

import useChat from '@/app/hooks/useChat'
import { FullChatType, User } from '@/app/types'
import clsx from 'clsx'
import { useSession } from 'next-auth/react'
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'

// import { User } from '@prisma/client'
import { MdOutlineGroupAdd } from 'react-icons/md'
import { find, uniq } from 'lodash'

import { pusherClient } from '@/lib/pusher'
import GroupChatModal from '../../modals/GroupChatModal'
import ChatBox from './ChatBox'
// import ConversationBox from './ConversationBox'

interface ChatListProps {
    initialItems: FullChatType[]
    users: User[]
    title?: string
}

const ChatList: React.FC<ChatListProps> = ({ initialItems, users }) => {
    const [items, setItems] = useState(initialItems)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const router = useRouter()
    const session = useSession()

    const { chatId, isOpen } = useChat()

    const pusherKey = useMemo(() => {
        return session.data?.user?.email
    }, [session.data?.user?.email])

    useEffect(() => {
        if (!pusherKey) {
            return
        }

        pusherClient.subscribe(pusherKey)

        const updateHandler = (conversation: FullChatType) => {
            setItems((current) =>
                current.map((currentConversation) => {
                    if (currentConversation.id === conversation.id) {
                        return {
                            ...currentConversation,
                            messages: conversation.messages,
                        }
                    }

                    return currentConversation
                })
            )
        }

        const newHandler = (conversation: FullChatType) => {
            setItems((current) => {
                if (find(current, { id: conversation.id })) {
                    return current
                }

                return [conversation, ...current]
            })
        }

        const removeHandler = (conversation: FullChatType) => {
            setItems((current) => {
                return [
                    ...current.filter((convo) => convo.id !== conversation.id),
                ]
            })
        }

        pusherClient.bind('conversation:update', updateHandler)
        pusherClient.bind('conversation:new', newHandler)
        pusherClient.bind('conversation:remove', removeHandler)
    }, [pusherKey, router])

    return (
        <>
            <GroupChatModal
                users={users}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
            <aside
                className={clsx(
                    `
        absolute 
        inset-y-0 
        pb-20
        lg:pb-0
        lg:left-20 
        lg:w-80 
        lg:block
        overflow-y-auto 
        border-r 
        border-gray-200 
      `,
                    isOpen ? 'hidden' : 'block w-full left-0'
                )}
            >
                <div className="px-5">
                    <div className="flex justify-between mb-4 pt-4">
                        <div className="text-2xl font-bold text-neutral-800">
                            Messages
                        </div>
                        <div
                            onClick={() => setIsModalOpen(true)}
                            className="
                rounded-full 
                p-2 
                bg-gray-100 
                text-gray-600 
                cursor-pointer 
                hover:opacity-75 
                transition
              "
                        >
                            <MdOutlineGroupAdd size={20} />
                        </div>
                    </div>
                    {items.map((item) => (
                        <ChatBox
                            key={item.id}
                            data={item}
                            selected={chatId === item.id}
                        />
                    ))}
                </div>
            </aside>
        </>
    )
}

export default ChatList
