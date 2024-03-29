'use client'

import useLinks from '@/lib/hooks/useLinks'
// import { useRoutes } from '@/constants'
import Link from 'next/link'
import React from 'react'

const NavItems = () => {
    const links = useLinks()
    return (
        <ul className="md:flex-center flex w-full flex-col items-start gap-5 md:flex-row">
            {links.map((link) => {
                return (
                    <li
                        key={link.route}
                        className={`${
                            link.active && 'text-primary-500'
                        } flex-center p-medium-20 whitespace-nowrap`}
                        // onClick={link.onClick}
                    >
                        <Link href={link.route}>{link.label}</Link>
                    </li>
                )
            })}
        </ul>
    )
}

export default NavItems
