import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
// import { PrismaAdapter } from '@auth/prisma-adapter'

// import prisma from '@/app/libs/prismadb'
import prisma from '@/lib/prisma'
import { AuthOptions } from 'next-auth'

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,

            profile(profile) {
                return {
                    id: profile.sub,
                    name: `${profile.given_name} ${profile.family_name}`,
                    email: profile.email,
                    image: profile.picture,
                    role: profile.role ? profile.role : 'user',
                    username: profile.email.split('@')[0],
                }
            },
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'password' },
                username: { label: 'username', type: 'text' },
            },
            async authorize(credentials) {
                if (
                    !credentials?.email ||
                    !credentials?.password ||
                    !credentials?.username
                ) {
                    throw new Error('Invalid credentials')
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email,
                    },
                })

                // console.log('lmao', user, 'lmao')

                const username = await prisma.user.findUnique({
                    where: {
                        username: credentials.username,
                    },
                })

                if (!user || !user?.password || !username) {
                    throw new Error('Invalid credentials')
                }

                // const isCorrectPassword = await bcrypt.compare(
                //     credentials.password,
                //     user.password
                // )

                // if (!isCorrectPassword) {
                //     throw new Error('Invalid credentials')
                // }

                // console.log(user)
                return user
            },
        }),
    ],
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user }
        },
        async session({ session, token }) {
            session.user.role = token.role
            return session
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
}
