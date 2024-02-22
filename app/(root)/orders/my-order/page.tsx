'use client'

import Search from '@/components/shared/Search'
import { getEventsByUser } from '@/lib/actions/get.event.actions'
import {
    getCurrentOrderByEventAndUser,
    getOrdersByEvent,
} from '@/lib/actions/get.order.actions'
import { formatDateTime, formatPrice } from '@/lib/utils'
import { SearchParamProps, TicketOrderType } from '@/types'
// import { IOrderItem } from '@/lib/database/models/order.model'
import gsap from 'gsap'
// import { renderToHTML } from 'next/dist/server/render'
import { useEffect, useMemo, useRef, useState } from 'react'
// import { Order } from '@prisma/client'
import ReactDOMServer, { renderToString } from 'react-dom/server'
// import html2pdf from 'html2pdf.js/dist/html2pdf.min.js'
import jsxToString from 'jsx-to-string'
import reactElementToJSXString from 'react-element-to-jsx-string'
import { Wrapper } from './style'
import QRCodeStyling from 'qr-code-styling'

const MyOrder = ({ searchParams }: SearchParamProps) => {
    // let [handlePrint, setHandlePrint] = useState()
    let handlePrint = () => {}

    const qrRef = useRef(null)

    useEffect(() => {
        if (document) {
            /*
             To avoid potential crashes of null/undefined selections, you may want
             to save the selection as a variable and check if the selection exists
             before attempting to add a style. For example, type guarding the
             selection to make sure its defined before attempting to access
             Element properties:
             const node = document.getElementById("container");
             if (node) node.style = "...";
          */
            const speed = 7
            const r = gsap.timeline({ repeat: -1 })
            const o = gsap.timeline({ repeat: -1 })
            const h = gsap.timeline({ repeat: -1 })
            const $ticket = document.querySelector('.ticket')
            // const $f = document.getElementById('app')
            // useMemo(() => setDoc($f),[name])
            $ticket!.addEventListener('mouseenter', () => {
                r.pause()
                o.pause()
                h.pause()
            })
            $ticket!.addEventListener('mouseleave', () => {
                r.play()
                o.play()
                h.play()
            })
            r.to('#app', {
                '--r': '180deg',
                '--p': '0%',
                duration: speed,
                ease: 'sine.in',
            })
            r.to('#app', {
                '--r': '360deg',
                '--p': '100%',
                duration: speed,
                ease: 'sine.out',
            })
            o.to('#app', {
                '--o': 1,
                duration: speed / 2,
                ease: 'power1.in',
            })
            o.to('#app', {
                '--o': 0,
                duration: speed / 2,
                ease: 'power1.out',
            })
            h.to('#app', {
                '--h': '100%',
                duration: speed / 2,
                ease: 'sine.in',
            })
            h.to('#app', {
                '--h': '50%',
                duration: speed / 2,
                ease: 'sine.out',
            })
            h.to('#app', {
                '--h': '0%',
                duration: speed / 2,
                ease: 'sine.in',
            })
            h.to('#app', {
                '--h': '50%',
                duration: speed / 2,
                ease: 'sine.out',
            })
            // return UI
        }
    }, [])
    const refContent = useRef(null)

    const eventId = (searchParams?.eventId as string) || ''
    const userId = (searchParams?.userId as string) || ''

    const [createdAt, setCreatedAt] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [image, setImage] = useState('')
    const [title, setTitle] = useState('')
    const [email, setEmail] = useState('')
    const [id, setId] = useState('')
    const [url, setUrl] = useState('')
    const [content, setContent] = useState('')

    async function l() {
        try {
            const order = await getCurrentOrderByEventAndUser({
                eventId: eventId,
                userId: userId,
            })
            setCreatedAt(order.createdAt)
            setStartTime(order.event.startDateTime)
            setEndTime(order.event.endDateTime)
            setUrl(order.event.url)
            setName(order.booker.name)
            if (order.booker.name.length > 25) {
                setName(order.booker.name.slice(0, 25) + '...')
            }
            setUsername(order.booker.username)
            if (order.booker.username.length > 20) {
                setUsername(order.booker.username.slice(0, 20) + '')
            }
            setImage(order.booker.image)

            setTitle(order.event.title)
            if (order.event.title.length > 40) {
                setTitle(order.event.title.slice(0, 40) + '...')
            }

            setEmail(order.booker.email)
            if (order.booker.email.length > 15) {
                setEmail(order.booker.email.slice(0, 15) + '...')
            }
            // console.log(order)
            setId(order.id)
            if (order.id.length > 7) {
                setId(order.id.slice(0, 7) + '')
            }
        } catch (err) {
            console.log(err)
        }
    }
    l()

    // useEffect(() => {
    //     qrCode.update({ data: url })
    //     // @ts-ignore
    //     qrCode.append(qrRef.current)
    //     console.log(qrCode, 'qr')
    // }, [url])

    // const contentToPrint = () => {
    //     return (
    //         <Wrapper>
    //             <main id="app">
    //                 <section className="ticket">
    //                     <header className="front">
    //                         <div className="holo"></div>
    //                         <img
    //                             className="logo"
    //                             src="/assets/images/Q-logo.svg"
    //                             alt="Queue Logo"
    //                         />
    //                         <aside className="divider"></aside>
    //                     </header>

    //                     <section className="back">
    //                         <div className="holo"></div>
    //                         <img
    //                             className="logo"
    //                             src="/assets/images/Q-logo.svg"
    //                             alt="Queue Logo"
    //                         />
    //                         <div className="data">
    //                             <p className="max-h-[80%]">{title}</p>
    //                             <h3>Date</h3>
    //                             <p>{createdAt}</p>
    //                             <h3>Time</h3>
    //                             <p>07:30 pm</p>
    //                             <h3>Fullname</h3>
    //                             <p>{name}</p>
    //                             <a className="qr" href="#">
    //                                 <img
    //                                     src="https://assets.codepen.io/13471/simeyqr.svg"
    //                                     alt="A code to use for accessing the simeydotme codepen profile"
    //                                 />
    //                             </a>
    //                         </div>

    //                         <aside className="divider">
    //                             <div className="username">
    //                                 <img className="profile" src={image} />
    //                                 <span>@{username}</span>{' '}
    //                                 <img
    //                                     className="verified"
    //                                     src="https://assets.codepen.io/13471/verified.png"
    //                                 />
    //                             </div>
    //                             <span className="usernum">
    //                                 {id.substring(0, 10)}
    //                             </span>
    //                         </aside>
    //                     </section>
    //                 </section>
    //             </main>
    //         </Wrapper>
    //     )
    // }

    // const qrCode = new QRCodeStyling({
    //     width: 300,
    //     height: 300,
    //     image: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg',
    //     dotsOptions: {
    //         color: '#4267b2',
    //         type: 'rounded',
    //     },
    //     imageOptions: {
    //         crossOrigin: 'anonymous',
    //         margin: 20,
    //     },
    // })

    // const p = reactElementToJSXString(contentToPrint())
    // console.log(contentToPrint())
    // const p = jsxToString(contentToPrint()).replaceAll('className', 'class')

    // console.log(p, 'i[po')
    // setContent(p)
    useMemo(() => {
        // setContent(p)
        setContent(refContent.current!)
        // console.log(refContent, 'yoyo')
    }, [name])

    handlePrint = async () => {
        // const html2pdf = (await import('html2pdf.js/dist/html2pdf.min.js')).default
        // console.log(content, 'haha')

        // const options = {
        //     margin: 1,
        //     filename: `${id}.pdf`,
        //     image: { type: 'jpeg', quality: 0.98 },
        //     html2canvas: {
        //         scale: 2,
        //         dpi: 1200,
        //         useCORS: true,
        //         logging: true,
        //         letterRendering: true,
        //     },
        //     jsPDF: { unit: 'mm', format: 'a4' },
        // }

        // let w = document.getElementById("frame").contentWindow
        // await content.getElementById("").print()
        // if (document) {

        //     const f = document.getElementById("app").print()
        // }
        await window.print()
        // const win = await window.open()
        // self.focus()
        // win!.document.open()
        // win!.document.write('<' + 'html' + '><' + 'body' + '>')
        // win!.document.write(content)

        // // win!.document.write('<style>' + '' + '</style>')
        // win!.document.write('<' + '/body' + '><' + '/html' + '>')
        // win!.document.close()
        // win!.print()
        // win!.close()

        // await html2pdf().set(options).from(content).save()
    }

    // console.log(content, 'rip')

    //generate PDF
    // const handlePrint = async () => {
    //     const html2pdf = (await import('html2pdf.js/dist/html2pdf.min.js'))
    //         .default
    //     console.log(content())
    //     const printElement = ReactDOMServer.renderToString(content())

    //     console.log(printElement)

    //     const options = {
    //         margin: 1,
    //         filename: `${id}.pdf `,
    //         image: { type: 'jpeg', quality: 0.98 },
    //         html2canvas: { scale: 2 },
    //         jsPDF: { unit: 'in', format: 'a4' },
    //     }
    //     await html2pdf().set(options).from(printElement).save()
    // }
    return (
        <>
            {/* <h1>Threads.</h1> */}
            <main id="app" ref={refContent}>
                <section className="ticket">
                    <header className="front">
                        <div className="holo"></div>
                        <img
                            className="logo cursor-pointer"
                            onClick={() => handlePrint()}
                            src="/assets/images/Q-logo.svg"
                            alt="Queue Logo"
                        />
                        <aside className="divider"></aside>
                    </header>

                    <section className="back">
                        <div className="holo"></div>
                        <img
                            className="logo cursor-pointer z-3"
                            onClick={() => handlePrint()}
                            src="/assets/images/Q-logo.svg"
                            alt="Queue Logo"
                        />
                        <div className="data">
                            <p className="max-w-[80%]">{title}</p>
                            <h3>Date</h3>
                            {/* contenteditable spellcheck=false */}
                            <p>
                                {formatDateTime(new Date(createdAt)).dateOnly}
                            </p>
                            <h3>Time</h3>
                            <p>
                                {formatDateTime(new Date(startTime)).timeOnly} -{' '}
                                {formatDateTime(new Date(endTime)).timeOnly}
                            </p>
                            <h3>Fullname</h3>
                            <p>{name}</p>
                            <a className="qr" ref={qrRef} href={url}>
                                <img
                                    className=" rounded-sm"
                                    src="/assets/images/qr-game.png"
                                    alt="A code to use for accessing the simeydotme codepen profile"
                                />
                            </a>
                        </div>

                        <aside className="divider">
                            <div className="username">
                                <img className="profile" src={image} />
                                <span className="">
                                    @{username.split('@')[0]}
                                </span>{' '}
                                <img
                                    className="verified"
                                    src="https://assets.codepen.io/13471/verified.png"
                                />
                            </div>
                            <span className="usernum">{id}</span>
                        </aside>
                    </section>
                </section>
            </main>
            {/*Social actions */}
            {/* <a
                className="social-icon codepen"
                href="https://codepen.io/simeydotme"
                title="view my codepens"
            >
                Made by Simey
            </a>

            <a
                className="social-icon twitter"
                href="https://twitter.com/simeydotme"
            >
                <svg viewBox="0 0 24 24">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c-.002 -.249 1.51 -2.772 1.818 -4.013z"></path>
                </svg>
            </a>
            <a
                className="social-icon github"
                href="https://github.com/simeydotme"
            >
                <svg viewBox="0 0 24 24">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"></path>
                </svg>
            </a> */}
        </>
    )
}

export default MyOrder
