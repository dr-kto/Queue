import Footer from '@/components/shared/Footer'
import Header from '@/components/shared/Header'
import getCurrentUser from '@/lib/actions/getCurrentUser'

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const currentUser = await getCurrentUser()

    return (
        <div className="flex h-screen flex-col">
            <Header currentUser={currentUser!} />
            <main className="flex-1  relative">{children}</main>
            <Footer />
        </div>
    )
}
