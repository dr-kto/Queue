import CategoryFilter from '@/components/shared/CategoryFilter'
import Search from '@/components/shared/Search'
import UserCollection from '@/components/shared/UserCollection'
import { Button } from '@/components/ui/button'
import { getEventsByUser } from '@/lib/actions/event.actions'
import { getAllUsers } from '@/lib/actions/user.actions'
import { SearchParamProps } from '@/types'
import { auth } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

const ChatsPage = async ({ searchParams }: SearchParamProps) => {
    const { sessionClaims } = auth()
    const userId = sessionClaims?.userId as string

    const usersPage = Number(searchParams?.eventsPage) || 1

    const organizedEvents = await getEventsByUser({ userId, page: usersPage })

    const page = Number(searchParams?.page) || 1
    const searchText = (searchParams?.query as string) || ''
    const category = (searchParams?.category as string) || ''

    const users = await getAllUsers({
        query: searchText,
        userId,
        category,
        limit: 2,
        page: usersPage,
    })
    console.log(searchParams, 'jk')
    // console.log(users, '11111')

    // console.log(organizedEvents?.data, 'dsfdfsd')

    return (
        <>
            {/* Events Organized */}

            <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
                <h2 className="h2-bold">
                    People
                    <br /> that you probably meet
                </h2>

                <div className="flex w-full flex-col gap-5 md:flex-row">
                    <Search />
                    <CategoryFilter />
                </div>

                <UserCollection
                    data={users?.data}
                    emptyTitle="There is no crowd"
                    emptyStateSubtext="don't worry, you'll find them!"
                    limit={3}
                    page={usersPage}
                    urlParamName="usersPage"
                    totalPages={organizedEvents?.totalPages}
                />
            </section>
        </>
    )
}

export default ChatsPage
