'use client'

import { formatDateTime } from '@/lib/utils'
import { auth } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { DeleteConfirmation } from './DeleteConfirmation'
import { IUser } from '@/lib/database/models/user.model'
import clsx from 'clsx'
import { useState } from 'react'
import getSession from '@/app/actions/getSession'
import { Button } from '../ui/button'

type UserCardProps = {
    user: IUser
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

    return (
        <div className="user-card group relative flex min-h-[380px] w-full  flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
            <div
                className="user-cover"
                style={{ backgroundImage: `url(${user.photo})` }}
            >
                <img
                    className="user-avatar"
                    src={user.photo}
                    alt="user profile image"
                />
            </div>
            <div className="user-details gap-5 flex flex-col">
                <div className="user-name ">
                    {user.firstName} {user.lastName}
                </div>
                <div className="text-sm font-medium text-[#0f5fc0]">
                    @{user.username}
                </div>
                <div
                    className={clsx(
                        `user-email text-start`,
                        activePlus ? '' : 'hidden'
                    )}
                >
                    Web Designer
                </div>
                <div
                    className={clsx(
                        `user-email text-start h-15`,
                        activePlus ? '' : 'hidden'
                    )}
                >
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Lorem ipsum dolor sit amet, consectetur.{' '}
                </div>
            </div>
            {/* <button className="contact-user ">contact</button>
                <button className="contact-user ">follow</button> */}
            <div className="flex gap-5 p-6 justify-start w-full">
                <Button asChild size="lg" className="userCardButton  sm:flex">
                    <Link href="/#events">follow</Link>
                </Button>
                <Button asChild size="lg" className="userCardButton  sm:flex">
                    <Link href="/#events">contact</Link>
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
