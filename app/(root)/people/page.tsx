import CategoryFilter from '@/components/shared/CategoryFilter'
import Search from '@/components/shared/Search'
import UserCollection from '@/components/shared/UserCollection'
import { Button } from '@/components/ui/button'
import { getEventsByUser } from '@/lib/actions/get.event.actions'
import { getAllUsers } from '@/lib/actions/get.user.actions'
import getCurrentUser from '@/lib/actions/getCurrentUser'
import getUsers from '@/lib/actions/getUsers'
import { SearchPeopleParamProps } from '@/types'
// import { auth } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

const PeoplePage = async ({ searchParams }: SearchPeopleParamProps) => {
    const currentUser = await getCurrentUser()
    const userId = currentUser?.id

    const usersPage = Number(searchParams?.usersPage) || 1

    console.log(usersPage, 'usersPage')

    // const organizedEvents = await getEventsByUser({ userId, page: usersPage })

    const searchText = (searchParams?.query as string) || ''
    const category = (searchParams?.category as string) || ''
    const location = (searchParams?.location as string) || ''
    const limit = 3

    const users = await getAllUsers({
        query: searchText,
        userId: userId,
        category,
        location: location,
        limit: limit,
        page: usersPage,
    })
    const usersWithoutQuery = await getAllUsers({
        userId: userId,
    })
    // console.log(searchParams, 'jk')
    // console.log(usersPage, '11111')
    // const i = await getCurrentUser()
    // const i = await getUsers()
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

                    <CategoryFilter
                        urlParamName="location"
                        placeholder="Location"
                        users={users?.data}
                        usersWithoutQuery={usersWithoutQuery?.data}
                    />
                </div>
                <UserCollection
                    data={users?.data}
                    emptyTitle="There is no crowd"
                    emptyStateSubtext="don't worry, you'll find them!"
                    limit={limit}
                    page={usersPage}
                    urlParamName="usersPage"
                    totalPages={users?.totalPages}
                />
            </section>
        </>
    )
}

export default PeoplePage
