import CategoryFilter from '@/components/shared/CategoryFilter'
import Search from '@/components/shared/Search'
import UserCollection from '@/components/shared/UserCollection'
import { Button } from '@/components/ui/button'
import { getEventsByUser } from '@/lib/actions/get.event.actions'
import { getAllUsers } from '@/lib/actions/get.user.actions'
import getCurrentUser from '@/lib/actions/getCurrentUser'
import getUsers from '@/lib/actions/getUsers'
import { SearchParamProps } from '@/types'
// import { auth } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

const PeoplePage = async ({ searchParams }: SearchParamProps) => {
    const currentUser = await getCurrentUser()
    const userId = currentUser?.id

    const usersPage = Number(searchParams?.usersPage) || 1

    const organizedEvents = await getEventsByUser({ userId, page: usersPage })

    const searchText = (searchParams?.query as string) || ''
    const category = (searchParams?.category as string) || ''

    const users = await getAllUsers({
        query: searchText,
        userId,
        category,
        limit: 2,
        page: usersPage,
    })
    // console.log(searchParams, 'jk')
    // console.log(usersPage, '11111')
    // const i = await getCurrentUser()
    const i = await getUsers()
    // console.log(users, 'dsfdfsd', i)

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
                    {/* {users?.toString()} */}

                    {/* <CategoryFilter /> */}
                </div>
                <UserCollection
                    data={users}
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

export default PeoplePage
