import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

interface FooterProps {
    isOpen?: boolean
}

const Footer: React.FC<FooterProps> = ({ isOpen }) => {
    return (
        <footer className={clsx(`border-t`, !isOpen ? 'block' : 'hidden')}>
            <div className="flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row">
                <Link href="/">
                    <Image
                        src="/assets/images/logo.svg"
                        alt="logo"
                        width={128}
                        height={38}
                    />
                </Link>

                <p>2024 Queue. All Rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer
