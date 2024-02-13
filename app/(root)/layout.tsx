'use client'
import Footer from '@/components/shared/Footer'
import Header from '@/components/shared/Header'
import useChat from '@/lib/hooks/useChat'
import { usePathname } from 'next/navigation'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { isOpen } = useChat()
    const pathname = usePathname()
    return (
        <div className="flex h-screen flex-col">
            <Header />
            <main className="flex-1  relative">{children}</main>
            <Footer isOpen={isOpen || pathname === '/chats'} />
        </div>
    )
}
