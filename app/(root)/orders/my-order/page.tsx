'use client'

import Search from '@/components/shared/Search'
import { getEventsByUser } from '@/lib/actions/get.event.actions'
import { getOrdersByEvent } from '@/lib/actions/get.order.actions'
import { formatDateTime, formatPrice } from '@/lib/utils'
import { SearchParamProps, TicketOrderType } from '@/types'
// import { IOrderItem } from '@/lib/database/models/order.model'
import gsap from 'gsap'
// import { renderToHTML } from 'next/dist/server/render'
import { useEffect, useMemo, useState } from 'react'
// import { Order } from '@prisma/client'
import ReactDOMServer, { renderToString } from 'react-dom/server'
// import html2pdf from 'html2pdf.js/dist/html2pdf.min.js'
import jsxToString from 'jsx-to-string'
import reactElementToJSXString from 'react-element-to-jsx-string'

const MyOrder = ({ searchParams }: SearchParamProps) => {
    // let [handlePrint, setHandlePrint] = useState()
    let handlePrint = () => {}

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

    const eventId = (searchParams?.eventId as string) || ''
    const searchText = (searchParams?.query as string) || ''

    const [createdAt, setCreatedAt] = useState('')
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [image, setImage] = useState('')
    const [title, setTitle] = useState('')
    const [email, setEmail] = useState('')
    const [id, setId] = useState('')
    const [content, setContent] = useState('')

    async function l() {
        try {
            const order = await getOrdersByEvent({
                eventId: eventId,
                searchString: searchText,
            })
            setCreatedAt(order[0].createdAt)
            setName(order[0].booker.name)
            setUsername(order[0].booker.username)
            setImage(order[0].booker.image)
            setTitle(order[0].event.title)
            setEmail(order[0].booker.email)
            setId(order[0].id)

            useMemo(() => {
                console.log(order[0].createdAt)
                setCreatedAt(order[0].createdAt)
            }, [createdAt])

            useMemo(() => setName(order[0].booker.name), [name])

            useMemo(() => setUsername(order[0].booker.username), [username])

            useMemo(() => setImage(order[0].booker.image), [image])

            useMemo(() => setTitle(order[0].booker.title), [title])

            useMemo(() => setEmail(order[0].booker.email), [email])

            useMemo(() => setId(order[0].id), [id])
        } catch (err) {
            console.log(err)
        }
    }
    l()

    const contentToPrint = () => {
        return (
            <main id="app">
                <section className="ticket">
                    <header className="front">
                        <div className="holo"></div>
                        <img
                            className="logo"
                            src="/assets/images/Q-logo.svg"
                            alt="Queue Logo"
                        />
                        <aside className="divider"></aside>
                    </header>

                    <section className="back">
                        <div className="holo"></div>
                        <img
                            className="logo"
                            src="/assets/images/Q-logo.svg"
                            alt="Queue Logo"
                        />
                        <div className="data">
                            <p className="max-h-[80%]">{title}</p>
                            <h3>Date</h3>
                            <p>{createdAt}</p>
                            <h3>Time</h3>
                            <p>07:30 pm</p>
                            <h3>Fullname</h3>
                            <p>{name}</p>
                            <a className="qr" href="#">
                                <img
                                    src="https://assets.codepen.io/13471/simeyqr.svg"
                                    alt="A code to use for accessing the simeydotme codepen profile"
                                />
                            </a>
                        </div>

                        <aside className="divider">
                            <div className="username">
                                <img className="profile" src={image} />
                                <span>@{username}</span>{' '}
                                <img
                                    className="verified"
                                    src="https://assets.codepen.io/13471/verified.png"
                                />
                            </div>
                            <span className="usernum">
                                {id.substring(0, 10)}
                            </span>
                        </aside>
                    </section>
                </section>
            </main>
        )
    }

    // const p = reactElementToJSXString(contentToPrint())
    console.log(contentToPrint())
    const p = jsxToString(contentToPrint()).replace('className', 'class')
    console.log(p, 'i[po')
    // setContent(p)
    useMemo(() => {
        setContent(p)
        console.log(contentToPrint(), 'yoyo')
    }, [name])

    handlePrint = async () => {
        // const html2pdf = (await import('html2pdf.js/dist/html2pdf.min.js'))
        //     .default
        console.log(content, 'haha')

        // const options = {
        //     margin: 1,
        //     filename: `${id}.pdf`,
        //     image: { type: 'jpeg', quality: 0.98 },
        //     html2canvas: { scale: 2, dpi: 1200, letterRendering: true },
        //     jsPDF: { unit: 'mm', format: 'a4' },
        // }

        // let w = document.getElementById("frame").contentWindow
        // await content.getElementById("").print()
        // await window.print()
        const win = await window.open()
        self.focus()
        win!.document.open()
        win!.document.write('<' + 'html' + '><' + 'body' + '>')
        win!.document.write(content)

        // win!.document.write('<style>' + '' + '</style>')
        win!.document.write('<' + '/body' + '><' + '/html' + '>')
        win!.document.close()
        win!.print()
        win!.close()
        // await html2pdf().set(options).from(content).save()
    }

    console.log(content, 'rip')

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

            <main id="app">
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
                            className="logo cursor-pointer z-10"
                            onClick={() => handlePrint()}
                            src="/assets/images/Q-logo.svg"
                            alt="Queue Logo"
                        />
                        <div className="data">
                            <p className="max-h-[80%]">{title}</p>
                            <h3>Date</h3>
                            {/* contenteditable spellcheck=false */}
                            <p>{createdAt}</p>
                            <h3>Time</h3>
                            <p>07:30 pm</p>
                            <h3>Fullname</h3>
                            <p>{name}</p>
                            <a className="qr" href="#">
                                <img
                                    src="https://assets.codepen.io/13471/simeyqr.svg"
                                    alt="A code to use for accessing the simeydotme codepen profile"
                                />
                            </a>
                        </div>

                        <aside className="divider">
                            <div className="username">
                                <img className="profile" src={image} />
                                <span>@{username}</span>{' '}
                                <img
                                    className="verified"
                                    src="https://assets.codepen.io/13471/verified.png"
                                />
                            </div>
                            <span className="usernum">
                                {id.substring(0, 10)}
                            </span>
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
