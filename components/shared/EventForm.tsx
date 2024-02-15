'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { eventFormSchema } from '@/lib/validator'
import * as z from 'zod'
import { eventDefaultValues } from '@/lib/constants'
import Dropdown from './Dropdown'
import { Textarea } from '@/components/ui/textarea'
import { FileUploader } from './FileUploader'
import { useState } from 'react'
import Image from 'next/image'
import DatePicker from 'react-datepicker'
import { useUploadThing } from '@/lib/uploadthing'

import 'react-datepicker/dist/react-datepicker.css'
import { Checkbox } from '../ui/checkbox'
import { useRouter } from 'next/navigation'
import { createEvent, updateEvent } from '@/lib/actions/get.event.actions'
// import { IEvent } from '@/lib/database/models/event.model'

import prisma from '@/lib/prisma'
import { Event } from '@prisma/client'
import axios from 'axios'
import toast from 'react-hot-toast'

type EventFormProps = {
    userId: string
    type: 'Create' | 'Update'
    event?: Event
    eventId?: string
}

const EventForm = ({ userId, type, event, eventId }: EventFormProps) => {
    const [files, setFiles] = useState<File[]>([])
    const initialValues =
        event && type === 'Update'
            ? {
                  title: event.title,
                  description: event.description,
                  location: event.location,
                  image: event.image,
                  startDateTime: new Date(event.startDateTime),
                  endDateTime: new Date(event.endDateTime),
                  reservationLimit: event.reservationLimit,
                  isNoLimit: event.isNoLimit,
                  url: event.url,
                  categoryId: event.categoryId,
              }
            : eventDefaultValues
    const router = useRouter()

    const { startUpload } = useUploadThing('imageUploader')

    const form = useForm<z.infer<typeof eventFormSchema>>({
        resolver: zodResolver(eventFormSchema),
        defaultValues: {
            title: initialValues.title || '',
            description: initialValues.description || '',
            location: initialValues.location || '',
            image: initialValues.image || '',
            startDateTime: initialValues.startDateTime,
            endDateTime: initialValues.endDateTime,
            reservationLimit: initialValues.reservationLimit || '',
            isNoLimit: initialValues.isNoLimit || false,
            url: initialValues.url || '',
            categoryId: initialValues.categoryId || '',
        },
    })
    async function onSubmit(values: z.infer<typeof eventFormSchema>) {
        let uploadedImageUrl = values.image

        if (files.length > 0) {
            const uploadedImages = await startUpload(files)

            if (!uploadedImages) {
                return
            }

            uploadedImageUrl = uploadedImages[0].url
        }

        if (type === 'Create') {
            try {
                // const newEvent = await createEvent({userId, eventToCreate: {...values, image: uploadedImageUrl}, path: "/profile"})}
                // axios
                //     .post('/api/event/create', {
                //         ...values,
                //         userId: userId,
                //     })
                //     .then((newEvent) => {
                //         form.reset()
                //         // router.push(`/`)
                //         console.log('smth wRONG ', newEvent.data.id)
                //         const newEventId = newEvent.data.id

                //         router.push(`/events/${newEventId}`)
                //     })
                //     .catch(() => toast.error('Something went wrong!'))

                // console.log('new evtn', newEvent)
                const newEvent = await createEvent({
                    userId,
                    eventToCreate: { ...values, image: uploadedImageUrl },
                    path: '/profile',
                })

                if (newEvent) {
                    form.reset()
                    router.push(`/events/${newEvent.id}`)
                }
            } catch (error) {
                console.log(error)
            }
        }

        if (type === 'Update') {
            if (!eventId) {
                router.back()
                return
            }

            try {
                // const updatedEvent = await prisma.event.update({
                //     where: { id: eventId },
                //     data: {
                //         title: values.title,
                //         description: values.description,
                //         location: values.location,
                //         image: uploadedImageUrl,
                //         startDateTime: new Date(values.startDateTime),
                //         endDateTime: new Date(values.endDateTime),
                //         reservationLimit: values.reservationLimit,
                //         isNoLimit: values.isNoLimit,
                //         url: values.url,
                //         category: { connect: { id: values.categoryId } },
                //         owner: { connect: { id: userId } },
                //     },
                // })

                const updatedEvent = await updateEvent({
                    userId,
                    eventToUpdate: {
                        ...values,
                        image: uploadedImageUrl,
                        id: eventId,
                        userId: userId,
                    },
                    path: `/events/${eventId}`,
                })

                if (updatedEvent) {
                    form.reset()
                    router.push(`/events/${updatedEvent.id}`)
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-5"
            >
                <div className="flex flex-col gap-5 md:flex-row">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Input
                                        placeholder="Event title"
                                        {...field}
                                        className="input-field"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="categoryId"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Dropdown
                                        onChangeHandler={field.onChange}
                                        value={field.value}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex flex-col gap-5 md:flex-row">
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl className="h-72">
                                    <Textarea
                                        placeholder="Description"
                                        {...field}
                                        className="textarea rounded-2xl"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl className="h-72">
                                    <FileUploader
                                        onFieldChange={field.onChange}
                                        image={field.value}
                                        setFiles={setFiles}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex flex-col gap-5 md:flex-row">
                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                                        <Image
                                            src="/assets/icons/location-grey.svg"
                                            alt="calendar"
                                            width={24}
                                            height={24}
                                        />

                                        <Input
                                            placeholder="Event location or Online"
                                            {...field}
                                            className="input-field"
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex flex-col gap-5 md:flex-row">
                    <FormField
                        control={form.control}
                        name="startDateTime"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                                        <Image
                                            src="/assets/icons/calendar.svg"
                                            alt="calendar"
                                            width={24}
                                            height={24}
                                            className="filter-grey"
                                        />
                                        <p className="ml-3 whitespace-nowrap text-grey-600">
                                            Start Date:
                                        </p>
                                        <DatePicker
                                            selected={field.value}
                                            onChange={(date: Date) =>
                                                field.onChange(date)
                                            }
                                            showTimeSelect
                                            timeInputLabel="Time:"
                                            dateFormat="MM/dd/yyyy h:mm aa"
                                            wrapperClassName="datePicker"
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="endDateTime"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                                        <Image
                                            src="/assets/icons/calendar.svg"
                                            alt="calendar"
                                            width={24}
                                            height={24}
                                            className="filter-grey"
                                        />
                                        <p className="ml-3 whitespace-nowrap text-grey-600">
                                            End Date:
                                        </p>
                                        <DatePicker
                                            selected={field.value}
                                            onChange={(date: Date) =>
                                                field.onChange(date)
                                            }
                                            showTimeSelect
                                            timeInputLabel="Time:"
                                            dateFormat="MM/dd/yyyy h:mm aa"
                                            wrapperClassName="datePicker"
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex flex-col gap-5 md:flex-row">
                    <FormField
                        control={form.control}
                        name="reservationLimit"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                                        <Image
                                            src="/assets/images/placeholderUser.jpg"
                                            alt="limit count"
                                            width={24}
                                            height={24}
                                            className="filter-grey"
                                        />
                                        <Input
                                            type="number"
                                            placeholder="Visitor Limit"
                                            {...field}
                                            className="p-regular-16 border-0 bg-grey-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                                        />
                                        <FormField
                                            control={form.control}
                                            name="isNoLimit"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <div className="flex items-center">
                                                            <label
                                                                htmlFor="isNoLimit"
                                                                className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                            >
                                                                Limitless
                                                            </label>
                                                            <Checkbox
                                                                onCheckedChange={
                                                                    field.onChange
                                                                }
                                                                checked={
                                                                    field.value
                                                                }
                                                                id="isFree"
                                                                className="mr-2 h-5 w-5 border-2 border-primary-500"
                                                            />
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="url"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                                        <Image
                                            src="/assets/icons/link.svg"
                                            alt="link"
                                            width={24}
                                            height={24}
                                        />

                                        <Input
                                            placeholder="URL"
                                            {...field}
                                            className="input-field"
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Button
                    type="submit"
                    size="lg"
                    disabled={form.formState.isSubmitting}
                    className="button col-span-2 w-full"
                >
                    {form.formState.isSubmitting
                        ? 'Submitting...'
                        : `${type} Event `}
                </Button>
            </form>
        </Form>
    )
}

export default EventForm
