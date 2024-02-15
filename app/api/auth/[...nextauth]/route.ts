import { authOptions } from '@/lib/authOptions'
// import bcrypt from 'bcrypt'
import NextAuth, { AuthOptions } from 'next-auth'

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
