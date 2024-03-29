'use client'

import useActiveList from '@/lib/hooks/useActiveLists'
import { User } from '@prisma/client'

import Image from 'next/image'

interface AvatarProps {
    user: User
}

const Avatar: React.FC<AvatarProps> = ({ user }) => {
    const { members } = useActiveList()
    const isActive = members.indexOf(user?.email!) !== -1

    return (
        <div className="relative flex items-center">
            <div
                className="
        relative 
        inline-block 
        rounded-full 
        overflow-hidden
        h-9 
        w-9 
        
      "
            >
                <Image
                    fill
                    src={user?.image || '/assets/images/placeholderUser.jpg'}
                    alt="Avatar"
                />
            </div>
            {isActive ? (
                <span
                    className="
            absolute 
            block 
            rounded-full 
            bg-green-500 
            ring-2 
            ring-white 
            top-0 
            right-0
            h-2 
            w-2 
            md:h-3 
            md:w-3
          "
                />
            ) : null}
        </div>
    )
}

export default Avatar
