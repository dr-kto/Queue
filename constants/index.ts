// import { HiChat } from 'react-icons/hi'
// import {
//     HiArrowLeftOnRectangle,
//     HiUsers,
//     HiRectangleStack,
//     HiUserCircle,
// } from 'react-icons/hi2'
// import { signOut } from 'next-auth/react'
// import useConversation from './useConversation'
// import useProfile from './useProfile'

// const { conversationId } = useConversation()
// const { profileId } = useProfile()

// const routes = useMemo(
//     () => [
//         {
//             label: 'Chat',
//             href: '/conversations',
//             icon: HiChat,
//             active: pathname === '/conversations' || !!conversationId,
//         },
//         {
//             label: 'Queue',
//             href: '/queue',
//             icon: HiRectangleStack,
//             active: pathname === '/queue',
//         },
//         {
//             label: 'Profile',
//             href: '/profile',
//             icon: HiUserCircle,
//             active: pathname === '/profile' || !!profileId,
//         },

//         // {
//         //     label: 'Users',
//         //     href: '/users',
//         //     icon: HiUsers,
//         //     active: pathname === '/users',
//         // },
//         // {
//         //     label: 'Logout',
//         //     onClick: () => signOut(),
//         //     href: '#',
//         //     icon: HiArrowLeftOnRectangle,
//         // },
//     ],
//     [pathname, conversationId]
// )

export const headerLinks = [
    {
        imgURL: '/assets/icons/home.svg',
        label: 'Events',
        route: '/',
        active: false,
    },
    {
        imgURL: '/assets/icons/home.svg',
        label: 'Posts',
        route: '/posts',
        active: false,
    },
    {
        imgURL: '/assets/icons/home.svg',
        label: 'Chats',
        route: '/chats',
        active: false,
    },
    // {
    //     imgURL: '/assets/icons/home.svg',
    //     label: 'Create Event',
    //     route: '/events/create',
    // },
    {
        imgURL: '/assets/icons/people.svg',
        label: 'People',
        route: '/people',
        active: false,
    },
    {
        imgURL: '/assets/icons/home.svg',
        label: 'My Profile',
        route: '/profile',
        active: false,
    },
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
]

export const eventDefaultValues = {
    title: '',
    description: '',
    location: '',
    imageUrl: '',
    startDateTime: new Date(),
    endDateTime: new Date(),
    categoryId: '',
    price: '',
    isFree: false,
    url: '',
}
