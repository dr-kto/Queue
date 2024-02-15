import getCurrentUser from '@/lib/actions/getCurrentUser'
import DesktopSidebar from './DesktopSidebar'
import MobileFooter from './MobileFooter'

async function Sidebar({ children }: { children: React.ReactNode }) {
    const currentUser = await getCurrentUser()

    return (
        <div className="h-full ">
            <DesktopSidebar currentUser={currentUser!} />
            <MobileFooter />
            <main className="h-full w-full justify-center">{children}</main>
        </div>
    )
}

export default Sidebar
