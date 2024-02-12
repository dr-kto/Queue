'use server'

import { revalidatePath } from 'next/cache'

import { connectToDatabase } from '@/lib/database'
import User from '@/lib/database/models/user.model'
import Order from '@/lib/database/models/order.model'
import Event from '@/lib/database/models/event.model'
import { handleError } from '@/lib/utils'

import Category from '@/lib/database/models/category.model'

import {
    CreateUserParams,
    GetAllEventsParams,
    GetAllUsersParams,
    UpdateUserParams,
} from '@/types'

const getCategoryByName = async (name: string) => {
    return Category.findOne({ name: { $regex: name, $options: 'i' } })
}

export async function createUser(user: CreateUserParams) {
    try {
        await connectToDatabase()

        const newUser = await User.create(user)
        return JSON.parse(JSON.stringify(newUser))
    } catch (error) {
        handleError(error)
    }
}

export async function getUserById(userId: string) {
    try {
        await connectToDatabase()

        const user = await User.findById(userId)

        if (!user) throw new Error('User not found')
        return JSON.parse(JSON.stringify(user))
    } catch (error) {
        handleError(error)
    }
}
// ****************
// export async function getAllUsers({
//     query,
//     limit = 6,
//     page,
//     category,
// }: GetAllUsersParams) {
//     try {
//         await connectToDatabase()

//         const user = await User.find()

//         if (!user) throw new Error('Users not found')
//         return JSON.parse(JSON.stringify(user))
//     } catch (error) {
//         handleError(error)
//     }
// }

export async function getAllUsers({
    query,
    limit = 6,
    userId,
    page,
    category,
}: GetAllUsersParams) {
    try {
        await connectToDatabase()

        // const titleCondition = query
        //     ? { title: { $regex: query, $options: 'i' } }
        //     : {}
        // const categoryCondition = category
        //     ? await getCategoryByName(category)
        //     : null
        // const conditions = {
        //     $and: [
        //         titleCondition,
        //         categoryCondition ? { category: categoryCondition._id } : {},
        //     ],
        // }

        // const skipAmount = (Number(page) - 1) * limit
        // const usersQuery = User.find(conditions)
        const usersQuery = await User.find().sort({ createdAt: 'desc' })
        // .skip(skipAmount)
        // .limit(limit)

        if (!usersQuery) throw new Error('Users not found')

        // const events = await populateEvent(eventsQuery)
        // const usersCount = await User.countDocuments(conditions)

        return {
            data: JSON.parse(JSON.stringify(usersQuery)),
            // totalPages: Math.ceil(usersCount / limit),
        }
    } catch (error) {
        handleError(error)
    }
}
// *********************

export async function updateUser(clerkId: string, user: UpdateUserParams) {
    try {
        await connectToDatabase()

        const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
            new: true,
        })

        if (!updatedUser) throw new Error('User update failed')
        return JSON.parse(JSON.stringify(updatedUser))
    } catch (error) {
        handleError(error)
    }
}

export async function deleteUser(clerkId: string) {
    try {
        await connectToDatabase()

        // Find user to delete
        const userToDelete = await User.findOne({ clerkId })

        if (!userToDelete) {
            throw new Error('User not found')
        }

        // Unlink relationships
        await Promise.all([
            // Update the 'events' collection to remove references to the user
            Event.updateMany(
                { _id: { $in: userToDelete.events } },
                { $pull: { organizer: userToDelete._id } }
            ),

            // Update the 'orders' collection to remove references to the user
            Order.updateMany(
                { _id: { $in: userToDelete.orders } },
                { $unset: { buyer: 1 } }
            ),
        ])

        // Delete user
        const deletedUser = await User.findByIdAndDelete(userToDelete._id)
        revalidatePath('/')

        return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null
    } catch (error) {
        handleError(error)
    }
}
