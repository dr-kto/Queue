// 'use server'

// // import { auth } from '@clerk/nextjs'

// const getSession = async () => {
//     const { sessionClaims } = await auth()
//     return sessionClaims
// }

// export default getSession

import { getServerSession } from 'next-auth'

import { authOptions } from '@/app/api/auth/[...nextauth]/route'
// import { NextApiRequest, NextApiResponse } from 'next'
// import NextAuth from 'next-auth/next'

export default async function getSession() {
    return await getServerSession(authOptions)
}

// const getSession = async (ctx: { req: NextApiRequest; res: NextApiResponse }) =>
//     getServerSession(ctx.req, ctx.res, authOptions(ctx.req, ctx.res))
// export default getSession
