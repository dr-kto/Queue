'use server'

import { auth } from '@clerk/nextjs'

const getSession = async () => {
    const { sessionClaims } = await auth()
    return sessionClaims
}

export default getSession

// import { getServerSession } from "next-auth";

// import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// export default async function getSession() {
//   return await getServerSession(authOptions);
// }
