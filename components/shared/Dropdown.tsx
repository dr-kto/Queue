import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
// import { ICategory } from '@/lib/database/models/category.model'
import { startTransition, useEffect, useState } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Input } from '../ui/input'
import {
    createCategory,
    getAllCategories,
} from '@/lib/actions/category.actions'
import { Category } from '@prisma/client'

type DropdownProps = {
    value?: string
    onChangeHandler?: () => void
}

const Dropdown = ({ value, onChangeHandler }: DropdownProps) => {
    const [categories, setCategories] = useState<Category[]>([])
    const [newCategory, setNewCategory] = useState('')

    const handleAddCategory = () => {
        createCategory({
            categoryName: newCategory.trim(),
        }).then((category) => {
            setCategories((prevState) => [...prevState, category])
        })
    }

    useEffect(() => {
        const getCategories = async () => {
            const categoryList = await getAllCategories()

            categoryList && setCategories(categoryList as Category[])
        }

        getCategories()
    }, [])

    const [isAlertOpen, setIsAlertOpen] = useState(false)

    return (
        <Select onValueChange={onChangeHandler} defaultValue={value}>
            <SelectTrigger className="select-field">
                <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
                {categories.length > 0 &&
                    categories.map((category) => (
                        <SelectItem
                            key={category.id}
                            value={category.id}
                            className="select-item p-regular-14"
                        >
                            {category.name}
                        </SelectItem>
                    ))}

                <AlertDialog open={isAlertOpen}>
                    <AlertDialogTrigger
                        onClick={() => setIsAlertOpen(true)}
                        className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500"
                    >
                        Add new category
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-white">
                        <AlertDialogHeader>
                            <AlertDialogTitle>New Category</AlertDialogTitle>
                            <AlertDialogDescription>
                                <Input
                                    type="text"
                                    placeholder="Category name"
                                    className="input-field mt-3"
                                    onChange={(e) =>
                                        setNewCategory(e.target.value)
                                    }
                                />
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel
                                onClick={() => setIsAlertOpen(false)}
                            >
                                Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                                onClick={() => {
                                    startTransition(handleAddCategory)
                                    setIsAlertOpen(false)
                                }}
                            >
                                Add
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </SelectContent>
        </Select>
    )
}

export default Dropdown
