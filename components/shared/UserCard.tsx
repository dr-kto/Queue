'use client'

import { formatDateTime } from '@/lib/utils'
// import { auth } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React, { useCallback } from 'react'
import { DeleteConfirmation } from './DeleteConfirmation'
import clsx from 'clsx'
import { useState } from 'react'
import getSession from '@/lib/actions/getSession'
import { Button } from '../ui/button'
import { User } from '@prisma/client'
import { useRouter } from 'next/navigation'
import axios from 'axios'

type UserCardProps = {
    user: User
}

const UserCard = ({ user }: UserCardProps) => {
    // const sessionClaims = getSession()
    // const userId = sessionClaims?.userId as string

    // const isEventCreator = userId
    const [activePlus, setActivePlus] = useState(false)
    const [plusContent, setPlusContent] = useState('+')

    const handlePlus = () => {
        setActivePlus(!activePlus)
        if (activePlus) {
            setPlusContent('+')
        } else {
            setPlusContent('-')
        }
    }

    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const handleClick = useCallback(() => {
        setIsLoading(true)

        axios
            .post('/api/chats', { userId: user.id })
            .then((user) => {
                router.push(`/chats/${user.data.id}`)
            })
            .finally(() => setIsLoading(false))
    }, [user, router])

    return (
        <div className="user-card group relative flex min-h-[380px] w-full  flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
            <div
                className="user-cover"
                style={{ backgroundImage: `url(${user.backgroudImage})` }}
            >
                <img
                    className="user-avatar"
                    src={user.image}
                    alt="user profile image"
                />
            </div>
            <div className=" overflow-auto max-h-[50%] user-details gap-5 flex flex-col">
                <div className="user-name ">{user.name}</div>
                <div className="text-sm font-medium text-[#0f5fc0]">
                    @{user.username}
                </div>
                <div
                    className={clsx(
                        `user-email text-start`,
                        activePlus ? '' : 'hidden'
                    )}
                >
                    {user.status}
                </div>
                <div
                    className={clsx(
                        `user-email text-start h-15`,
                        activePlus ? '' : 'hidden'
                    )}
                >
                    {user.bio}
                </div>
            </div>
            {/* <button className="contact-user ">contact</button>
                <button className="contact-user ">follow</button> */}
            <div className="bg-inherit flex gap-5 p-6 justify-start w-full">
                {/* <Button asChild size="lg" className="userCardButton  sm:flex">
                    <Link href="/#events">follow</Link>
                </Button> */}
                <Button
                    asChild
                    size="lg"
                    className="userCardButton  sm:flex w-full max-w-[80%]"
                    onClick={handleClick}
                >
                    <Link href="">contact</Link>
                </Button>
            </div>
            <button
                className={clsx(
                    ` text-4xl absolute right-4 bottom-2 rounded-tl-[22px] rounded-br-[22px] rounded-tr-none rounded-bl-none px-[13px] py-[14px]`,
                    activePlus && 'active'
                )}
                onClick={() => handlePlus()}
            >
                {plusContent}
            </button>
        </div>
    )
}

export default UserCard
