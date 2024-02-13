'use client'

import useChat from '@/lib/hooks/useChat'
import EmptyState from '@/components/custom/EmptyState'
import CategoryFilter from '@/components/shared/CategoryFilter'
import Search from '@/components/shared/Search'
import UserCollection from '@/components/shared/UserCollection'
import { Button } from '@/components/ui/button'
import { getEventsByUser } from '@/lib/actions/event.actions'
import { getAllUsers } from '@/lib/actions/user.actions'
import { SearchParamProps } from '@/types'
import { auth } from '@clerk/nextjs'
import clsx from 'clsx'
import Link from 'next/link'
import React from 'react'

const ChatsPage = async ({ searchParams }: SearchParamProps) => {
    // const { sessionClaims } = auth()
    // const userId = sessionClaims?.userId as string

    // const usersPage = Number(searchParams?.usersPage) || 1

    // const organizedEvents = await getEventsByUser({ userId, page: usersPage })

    // const searchText = (searchParams?.query as string) || ''
    // const category = (searchParams?.category as string) || ''

    // const users = await getAllUsers({
    //     query: searchText,
    //     userId,
    //     category,
    //     limit: 2,
    //     page: usersPage,
    // })
    // console.log(searchParams, 'jk')
    // console.log(users, '11111')

    // console.log(organizedEvents?.data, 'dsfdfsd')
    const { isOpen } = useChat()

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
