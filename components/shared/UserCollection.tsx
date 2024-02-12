import { IEvent } from '@/lib/database/models/event.model'
import React from 'react'
import Card from './Card'
import Pagination from './Pagination'
import UserCard from './UserCard'
import { IUser } from '@/lib/database/models/user.model'

type UserCollectionProps = {
    data: IUser[]
    emptyTitle: string
    emptyStateSubtext: string
    limit: number
    page: number | string
    totalPages?: number
    urlParamName?: string
}

const UserCollection = ({
    data,
    emptyTitle,
    emptyStateSubtext,
    page,
    totalPages = 0,
    urlParamName,
}: UserCollectionProps) => {
    return (
        <>
            {data.length > 0 ? (
                <div className="flex flex-col items-center gap-10">
                    <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
                        {data.map((user) => {
                            return (
                                <li
                                    key={user._id}
                                    className="flex justify-center"
                                >
                                    <UserCard user={user} />
                                </li>
                            )
                        })}
                    </ul>

                    {totalPages > 1 && (
                        <Pagination
                            urlParamName={urlParamName}
                            page={page}
                            totalPages={totalPages}
                        />
                    )}
                </div>
            ) : (
                <div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center">
                    <h3 className="p-bold-20 md:h5-bold">{emptyTitle}</h3>
                    <p className="p-regular-14">{emptyStateSubtext}</p>
                </div>
            )}
        </>
    )
}

export default UserCollection