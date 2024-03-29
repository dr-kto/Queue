'use client'

import axios from 'axios'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { User } from '@prisma/client'
import { CldUploadButton } from 'next-cloudinary'

import Input from '../inputs/Input'
import Modal from '../modals/Modal'
import Button from '../Button'
import Image from 'next/image'
import { toast } from 'react-hot-toast'
import { signOut } from 'next-auth/react'

interface SettingsModalProps {
    isOpen?: boolean
    onClose: () => void
    currentUser: User
}

const SettingsModal: React.FC<SettingsModalProps> = ({
    isOpen,
    onClose,
    currentUser,
}) => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    // console.log(currentUser, '&TEST_CURRENT_USER')
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: currentUser?.name,
            username: currentUser?.username,
            status: currentUser?.status,
            bio: currentUser?.bio,
            location: currentUser?.location,
            image: currentUser?.image,
            backgroundImage: currentUser?.backgroudImage,
            password: currentUser?.password,
            // email: currentUser?.email,
        },
    })

    const image = watch('image')
    const backgroundImage = watch('backgroundImage')

    const handleUpload = (result: any) => {
        setValue('image', result.info.secure_url, {
            shouldValidate: true,
        })
    }
    const handleBGUpload = (result: any) => {
        setValue('backgroundImage', result.info.secure_url, {
            shouldValidate: true,
        })
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)

        axios
            .post('/api/settings', data)
            .then(() => {
                router.refresh()
                onClose()
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => setIsLoading(false))
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-8">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">
                            Profile
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            Edit your public information.
                        </p>

                        <div className="mt-10 flex flex-col gap-y-8">
                            <Input
                                disabled={isLoading}
                                label="Name"
                                id="name"
                                errors={errors}
                                required
                                register={register}
                            />
                            <Input
                                disabled={isLoading}
                                label="username"
                                id="username"
                                errors={errors}
                                required
                                register={register}
                            />
                            <Input
                                disabled={isLoading}
                                label="Status"
                                id="status"
                                errors={errors}
                                register={register}
                            />
                            <Input
                                disabled={isLoading}
                                label="About yourself"
                                id="bio"
                                errors={errors}
                                register={register}
                            />
                            <Input
                                disabled={isLoading}
                                label="Location"
                                id="location"
                                errors={errors}
                                register={register}
                            />
                            <Input
                                disabled={isLoading}
                                label="Password"
                                id="password"
                                errors={errors}
                                register={register}
                            />
                            {/* <Input
                                disabled={isLoading}
                                label="Email"
                                id="email"
                                errors={errors}
                                required
                                register={register}
                            /> */}
                            {/* PHOTO */}
                            <div>
                                <label
                                    htmlFor="photo"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Photo
                                </label>
                                <div className="mt-2 flex items-center gap-x-3">
                                    <Image
                                        width="48"
                                        height="48"
                                        className="rounded-full"
                                        src={
                                            image ||
                                            currentUser?.image ||
                                            '/assets/images/placeholderUser.jpg'
                                        }
                                        alt="Avatar"
                                    />
                                    <CldUploadButton
                                        options={{ maxFiles: 1 }}
                                        onUpload={handleUpload}
                                        uploadPreset="ityijtur"
                                    >
                                        <Button
                                            disabled={isLoading}
                                            secondary
                                            type="button"
                                        >
                                            Change
                                        </Button>
                                    </CldUploadButton>
                                </div>
                            </div>
                            {/* BACKGROUND */}
                            <div>
                                <label
                                    htmlFor="backgroundImage"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Background Image
                                </label>
                                <div className="mt-2 flex items-center gap-x-3">
                                    <Image
                                        width="100"
                                        height="100"
                                        className=" rounded-sm"
                                        src={
                                            backgroundImage ||
                                            currentUser?.backgroudImage ||
                                            '/assets/images/placeholderUser.jpg'
                                        }
                                        alt="Avatar"
                                    />
                                    <CldUploadButton
                                        options={{ maxFiles: 1 }}
                                        onUpload={handleBGUpload}
                                        uploadPreset="ityijtur"
                                    >
                                        <Button
                                            disabled={isLoading}
                                            secondary
                                            type="button"
                                        >
                                            Change
                                        </Button>
                                    </CldUploadButton>
                                </div>
                            </div>
                            <p
                                className="mt-5 flex text-base leading-6 gap-2 text-black cursor-pointer"
                                onClick={() => signOut()}
                            >
                                Logout
                                <Image
                                    width={15}
                                    height={15}
                                    src="/assets/icons/logout.svg"
                                    alt="logout"
                                />
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <Button disabled={isLoading} secondary onClick={onClose}>
                        Cancel
                    </Button>
                    <Button disabled={isLoading} type="submit">
                        Save
                    </Button>
                </div>
            </form>
        </Modal>
    )
}

export default SettingsModal
