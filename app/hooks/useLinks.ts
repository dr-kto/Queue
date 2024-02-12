import { useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { headerLinks } from '@/constants'

const useLinks = () => {
    const pathname = usePathname()
    const routes = useMemo(
        () =>
            headerLinks.map((link) => ({
                ...link,
                active: pathname === link.route,
            })),
        [pathname]
    )

    return routes
}

export default useLinks
