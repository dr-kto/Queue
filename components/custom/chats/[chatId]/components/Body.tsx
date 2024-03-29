'use client'

import axios from 'axios'
import useChat from '@/lib/hooks/useChat'
import MessageBox from './MessageBox'
import { useEffect, useRef, useState } from 'react'
import { FullMessageType } from '@/types'
import { pusherClient } from '@/lib/pusher'
import { find } from 'lodash'

interface BodyProps {
    initialMessages: FullMessageType[]
}

const Body: React.FC<BodyProps> = ({ initialMessages = [] }) => {
    const bottomRef = useRef<HTMLDivElement>(null)
    const [messages, setMessages] = useState(initialMessages)

    const { chatId } = useChat()

    useEffect(() => {
        axios.post(`/api/chats/${chatId}/seen`)
    }, [chatId])

    useEffect(() => {
        pusherClient.subscribe(chatId)
        bottomRef?.current?.scrollIntoView()

        const messageHandler = (message: FullMessageType) => {
            axios.post(`/api/chats/${chatId}/seen`)

            setMessages((current) => {
                if (find(current, { id: message.id })) {
                    return current
                }

                return [...current, message]
            })

            bottomRef?.current?.scrollIntoView()
        }

        const updateMessageHandler = (newMessage: FullMessageType) => {
            setMessages((current) =>
                current.map((currentMessage) => {
                    if (currentMessage.id === newMessage.id) {
                        return newMessage
                    }

                    return currentMessage
                })
            )
        }

        pusherClient.bind('messages:new', messageHandler)
        pusherClient.bind('message:update', updateMessageHandler)

        return () => {
            pusherClient.unsubscribe(chatId)
            pusherClient.unbind('messages:new', messageHandler)
            pusherClient.unbind('message:update', updateMessageHandler)
        }
    }, [chatId])

    return (
        <div className="flex-1 overflow-y-auto">
            {messages.map((message, i) => (
                <MessageBox
                    isLast={i === messages.length - 1}
                    key={message.id}
                    data={message}
                />
            ))}
            <div className="pt-24" ref={bottomRef} />
        </div>
    )
}

export default Body
