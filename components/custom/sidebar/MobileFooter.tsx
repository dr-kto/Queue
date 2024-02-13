'use client'

import useChat from '@/app/hooks/useChat'
import useLinks from '@/app/hooks/useLinks'
import MobileItem from './MobileItem'

const MobileFooter = () => {
    const links = useLinks()
    const { isOpen } = useChat()

    if (isOpen) {
        return null
    }

    return (
        <div
            className="
            fixed
            justify-between
            w-full
            bottom-0
            z-40
            flex
            items-center
            bg-white
            border-t-[1px]
            lg:hidden
          "
        >
            {/* {links.map((route) => (
                <MobileItem
                    key={route.route}
                    href={route.route}
                    active={route.active}
                    icon={route.icon}
                    onClick={route.onClick}
                />
            ))} */}
        </div>
    )
}

export default MobileFooter
