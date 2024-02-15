'use client'
import { useChat } from '@/lib/hooks/use.chat.hooks'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// interface FooterProps {
//     isOpen?: boolean
// }

// const Footer: React.FC<FooterProps> = ({ isOpen }) => {
const Footer = () => {
    const { isOpen } = useChat()
    const pathname = usePathname()
    return (
        <footer
            className={clsx(
                `border-t`,
                !isOpen || pathname === '/chats' ? '' : 'hidden'
            )}
        >
            <div className="flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row">
                <Link href="/">
                    <Image
                        src="/assets/images/logo.svg"
                        alt="logo"
                        width={128}
                        height={38}
                    />
                </Link>

                <p>2024 Queue. All Rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer
