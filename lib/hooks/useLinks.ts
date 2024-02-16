import { useMemo } from 'react'
import { usePathname } from 'next/navigation'
import useProfile from './useProfile'
import useChat from './useChat'
import { HiArrowLeftOnRectangle } from 'react-icons/hi2'
import { signOut } from 'next-auth/react'

const useLinks = () => {
    const pathname = usePathname()
    const { chatId } = useChat()
    const { profileId } = useProfile()

    const routes = useMemo(
        () => [
            {
                imgURL: HiArrowLeftOnRectangle,
                label: 'Events',
                route: '/',
                active: pathname === '/',
            },
            // {
            //     imgURL: HiArrowLeftOnRectangle,
            //     label: 'Posts',
            //     route: '/posts',
            //     active: pathname === '/posts',
            //     // active: pathname === '/posts' || !!postId,
            // },
            {
                imgURL: HiArrowLeftOnRectangle,
                label: 'People',
                route: '/people',
                active: pathname === '/people',
            },
            {
                imgURL: HiArrowLeftOnRectangle,
                label: 'Chats',
                route: '/chats',
                active: pathname === '/chats' || !!chatId,
            },
            // {
            //     imgURL: '/assets/icons/home.svg',
            //     label: 'Create Event',
            //     route: '/events/create',
            // },

            {
                imgURL: HiArrowLeftOnRectangle,
                label: 'My Queue',
                route: '/profile',
                active: pathname === '/profile' || !!profileId,
            },
            // {
            //     label: 'Logout',
            //     onClick: () => signOut(),
            //     route: '#',
            //     icon: HiArrowLeftOnRectangle,
            // },
            // {
            //     imgURL: '/assets/icons/wallpaper.svg',
            //     label: 'Explore',
            //     route: '/explore',
            // },
            // {
            //     imgURL: '/assets/icons/bookmark.svg',
            //     label: 'Saved',
            //     route: '/posts/saved',
            // },
            // {
            //     imgURL: '/assets/icons/gallery-add.svg',
            //     label: 'Create Post',
            //     route: '/posts/create',
            // },
        ],
        // headerLinks.map((link) => ({
        //     ...link,
        //     active: pathname === link.route,
        // })),
        [pathname]
    )

    return routes
}

export default useLinks
