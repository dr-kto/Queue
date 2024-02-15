'use client'

import useChat from '@/lib/hooks/useChat'
import EmptyState from '@/components/custom/EmptyState'
// import { SearchParamProps } from '@/types'
import clsx from 'clsx'
import React from 'react'
import { usePathname } from 'next/navigation'
import { useChatOpen } from '@/lib/hooks/use.user.hooks'

// const ChatsPage = async ({ searchParams }: SearchParamProps) => {
const ChatsPage = async () => {
    const isOpen = await useChatOpen()

    return (
        <div
            className={clsx(
                'w-full h-full lg:block',
                isOpen ? 'block' : 'hidden'
            )}
        >
            <EmptyState />
        </div>
    )
}

export default ChatsPage
