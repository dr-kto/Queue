// import { SignedIn, SignedOut, UserButton, UserProfile } from '@clerk/nextjs'
'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../ui/button'
import NavItems from './NavItems'
import MobileNav from './MobileNav'
import { useSession } from 'next-auth/react'
import clsx from 'clsx'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import SettingsModal from '../custom/sidebar/SettingsModal'
import getCurrentUser from '@/lib/actions/getCurrentUser'
import Avatar from '../custom/Avatar'
import { User } from '@prisma/client'

interface HeaderProps {
    currentUser: User
}

const Header: React.FC<HeaderProps> = ({ currentUser }) => {
    // useEffect(() => {
    //     if (session?.status === 'authenticated') {
    //         router.push('/chats')
    //     }
    // }, [session?.status, router])

    const session = useSession()
    const isSignedIn = session?.status === 'authenticated'
    const pathname = usePathname()
    const isLoginPage = pathname === '/login'
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            {/*// @ts-ignore */}
            <SettingsModal
                currentUser={currentUser!}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
            <header className="w-full border-b">
                <div className="wrapper flex items-bottom justify-between">
                    <Link href="/" className="w-36">
                        <Image
                            src="/assets/images/logo.svg"
                            width={128}
                            height={38}
                            alt="Queue logo"
                        />
                    </Link>

                    {isSignedIn && (
                        <nav
                            className={clsx(
                                `md:flex-between md:items-bottom hidden w-full max-w-xs`
                                // isSignedIn ? '' : 'w-0 overflow-hidden opacity-0'
                            )}
                        >
                            <NavItems />
                        </nav>
                    )}
                    {/* </SignedIn> */}
                    <div className="flex  justify-end gap-3">
                        {/* <SignedIn> */}
                        {/* <UserButton
                            afterSignOutUrl="/"
                            userProfileMode="navigation"
                            userProfileUrl="/profile"
                        />
                        <UserButton afterSignOutUrl="/" />
                         <UserProfile path="/profile" routing="path" />  */}

                        <nav
                            className={clsx(
                                `flex flex-col justify-between items-center`,
                                isSignedIn ? '' : 'hidden opacity-0 w-0'
                            )}
                        >
                            <div
                                onClick={() => setIsOpen(true)}
                                className="cursor-pointer hover:opacity-75 transition"
                            >
                                <Avatar user={currentUser} />
                            </div>
                        </nav>

                        <MobileNav isSignedIn={isSignedIn} />
                        {/* </SignedIn> */}
                        {/* <SignedOut> */}

                        <Button
                            asChild
                            className={clsx(
                                `rounded-full`,
                                isSignedIn ? ' w-0 hidden' : '',
                                isLoginPage ? 'w-0 hidden' : ''
                            )}
                            size="lg"
                        >
                            <Link href="/login">Login</Link>
                        </Button>
                        {/* </SignedOut> */}
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header
