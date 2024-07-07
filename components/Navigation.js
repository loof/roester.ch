import { useSession } from "@/lib/hooks/session"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import styles from "./Navigation.module.css"

export default function Navigation() {
    const { session, signOut } = useSession()
    const [isOpen, setIsOpen] = useState(false)
    const email = session.email
    const router = useRouter()

    useEffect(() => setIsOpen(false), [router.pathname])

    const handleClick = async (e) => {
        e.preventDefault()
        signOut()
        setIsOpen(false)
        router.push("/")
    }

    return (
        <nav className={styles.navigation}>
            <div onClick={e => setIsOpen(open => !open)}>{isOpen ? "✖" : "☰"}</div>

            <ul className={isOpen ? styles.open : ""}>

                {!email && <li key="login"><Link href="/login">Login</Link></li>}

                {
                    email && <>
                        <li key="create"><Link href="/events">Events</Link></li>

                        <li key="profile">
                            <Link href="/profile">
                                Profile
                            </Link>

                        </li>

                        <li key="logout">
                            <a href="" className={styles.logout} onClick={handleClick}>
                                Logout
                            </a>
                        </li>
                    </>
                }

            </ul>
        </nav>
    )
}