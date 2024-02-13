import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
// import { frFR, ruRU } from '@clerk/localizations'
import './globals.css'
import AuthContext from './context'

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-poppins',
})

export const metadata: Metadata = {
    title: 'Queue',
    description: 'Keep in Queue for Exciting Updates!"',
    icons: {
        icon: '/assets/images/logo.svg',
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <ClerkProvider>
            <AuthContext>
                <html lang="en">
                    <body className={poppins.variable}>{children}</body>
                </html>
            </AuthContext>
        </ClerkProvider>
    )
}
