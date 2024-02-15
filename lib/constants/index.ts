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

export const eventDefaultValues = {
    title: '',
    description: '',
    location: '',
    image: '',
    startDateTime: new Date(),
    endDateTime: new Date(),
    reservationLimit: '',
    isNoLimit: false,
    url: '',
    categoryId: '',
}
