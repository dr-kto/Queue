'use client'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { getAllCategories } from '@/lib/actions/category.actions'
import { getAllUsers } from '@/lib/actions/get.user.actions'
import getCurrentUser from '@/lib/actions/getCurrentUser'
// import { ICategory } from '@/lib/database/models/category.model'
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils'
import { Event, User } from '@prisma/client'
// import { Category } from '@prisma/client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

interface eCategory extends Document {
    id: string
    name: string
}

interface CategoryFilterParams {
    placeholder?: string
    urlParamName?: string
    users?: User[]
    usersWithoutQuery?: User[]
    eventsWithoutQuery?: Event[]
}

const CategoryFilter: React.FC<CategoryFilterParams> = ({
    placeholder = 'Category',
    urlParamName = 'category',
    users = [],
    usersWithoutQuery = [],
    eventsWithoutQuery = [],
}) => {
    const [categories, setCategories] = useState<eCategory[]>([])
    const router = useRouter()
    const searchParams = useSearchParams()

    useEffect(() => {
        const getCategories = async () => {
            if (urlParamName === 'category') {
                // eventsWithoutQuery
                const categoryList = await getAllCategories()

                categoryList && setCategories(categoryList as eCategory[])
            } else if (urlParamName === 'location') {
                const locations = usersWithoutQuery.map((user) => {
                    console.log(user, 'user')
                    return { id: user.id, name: user.location || '' }
                })
                // console.log(users, 'USERS', locations, 'LOCATIONS')
                // console.log(usersWithoutQuery, 'lopa')
                let resArr = [] as any[]
                locations.forEach(function (item) {
                    let i = resArr.findIndex((x) => x.name == item.name)
                    if (i <= -1) {
                        resArr.push({ id: item.id, name: item.name })
                    }
                })
                // console.log(locations, 'targeted location')
                users && setCategories(resArr as eCategory[])
            }
        }

        getCategories()
    }, [])

    const onSelectCategory = (category: string) => {
        let newUrl = ''

        if (category && category !== 'All') {
            newUrl = formUrlQuery({
                params: searchParams!.toString(),
                key: urlParamName,
                value: category,
            })
        } else {
            newUrl = removeKeysFromQuery({
                params: searchParams!.toString(),
                keysToRemove: [urlParamName],
            })
        }

        router.push(newUrl, { scroll: false })
    }

    return (
        <Select onValueChange={(value: string) => onSelectCategory(value)}>
            <SelectTrigger className="select-field">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="All" className="select-item p-regular-14">
                    All
                </SelectItem>

                {categories.map((category) => (
                    <SelectItem
                        value={category.name}
                        key={category.id}
                        className="select-item p-regular-14"
                    >
                        {category.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

export default CategoryFilter
