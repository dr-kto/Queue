// import { authMiddleware } from '@clerk/nextjs'

// export default authMiddleware({
//     publicRoutes: [
//         '/',
//         '/events/:id',
//         '/api/webhook/clerk',
//         '/api/webhook/stripe',
//         '/api/uploadthing',
//     ],
//     ignoredRoutes: [
//         '/api/webhook/clerk',
//         '/api/webhook/stripe',
//         '/api/uploadthing',
//     ],
// })

import withAuth from 'next-auth/middleware'

export default withAuth({
    pages: {
        signIn: '/login',
    },
})

// export const config = {
//     matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
// }
export const config = {
    matcher: [
        '/chats/:path*',
        '/people/:path*',
        '/posts/:path*',
        '/events/:path*',
        '/profile/:path*',
    ],
}
