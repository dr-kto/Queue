'use client'

import useLinks from '@/app/hooks/useLinks'
import { useState } from 'react'
import SettingsModal from './SettingsModal'
import DesktopItem from './DesktopItem'
import Avatar from '../Avatar'

// import { User } from "@prisma/client";

export type User = {
    id: string
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
    hashedPassword: string | null
    createdAt: Date
    updatedAt: Date
    conversationIds: string[]
    seenMessageIds: string[]
}

interface DesktopSidebarProps {
    currentUser: User
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ currentUser }) => {
    const links = useLinks()
    const [isOpen, setIsOpen] = useState(false)

    //   console.log({ currentUser, }, 'TEST')

    return (
        <div></div>
        //     <>
        //         <SettingsModal
        //             currentUser={currentUser}
        //             isOpen={isOpen}
        //             onClose={() => setIsOpen(false)}
        //         />
        //         <div
        //             className="
        //     hidden
        //     lg:fixed
        //     lg:inset-y-0
        //     lg:left-0
        //     lg:z-40
        //     lg:w-20
        //     xl:px-6
        //     lg:overflow-y-auto
        //     lg:bg-white
        //     lg:border-r-[1px]
        //     lg:pb-4
        //     lg:flex
        //     lg:flex-col
        //     justify-between
        //   "
        //         >
        //             <nav className="mt-4 flex flex-col justify-between">
        //                 <ul
        //                     role="list"
        //                     className="flex flex-col items-center space-y-1"
        //                 >
        //                     {/* {links.map((item) => (
        //                         <DesktopItem
        //                             key={item.label}
        //                             href={item.route}
        //                             label={item.label}
        //                             icon={item.imgURL}
        //                             active={item.active}
        //                             onClick={item.onClick}
        //                         />
        //                     ))} */}
        //                 </ul>
        //             </nav>
        //             <nav className="mt-4 flex flex-col justify-between items-center">
        //                 <div
        //                     onClick={() => setIsOpen(true)}
        //                     className="cursor-pointer hover:opacity-75 transition"
        //                 >
        //                     <Avatar user={currentUser} />
        //                 </div>
        //             </nav>
        //         </div>
        //     </>
    )
}

export default DesktopSidebar
