import NextAuth from 'next-auth'
import { User } from '@prisma/client'
import { JWT } from 'next-auth/jwt'

// declare module 'next-auth' {
//     interface session {
//         user: User
//     }
// }

// declare module 'next-auth/jwt' {
//     type JWT = User
// }
