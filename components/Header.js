import styles from "./Header.module.css"
import Link from "next/link";
import {useEffect, useState} from "react";
import {useSession} from "@/lib/hooks/session";
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'

export default function Header({children}) {
    const [isMenuExpanded, setIsMenuExpanded] = useState(false);
    const menuClassname = isMenuExpanded ? `${styles["menuExpanded"]} ${styles["header"]}` : `${styles["header"]}`;
    const { session, signOut, isSignedIn } = useSession()
    const router = useRouter()
    const toggleMenuExpanded = () => {
        setIsMenuExpanded(!isMenuExpanded)
    }
    const pathname = usePathname()

    useEffect(() => {
        window.addEventListener('resize', function (event) {
            setIsMenuExpanded(false)
        });
    }, []);

    const handleLogout = async (e) => {
        e.preventDefault()
        signOut()
        setIsMenuExpanded(false)
        await router.push("/")
    }


    console.log(router.query)
    return (
        <header className={menuClassname}>
            <nav className={styles.nav}>

                <div className={styles.buttons}>
                    <button className={styles.navHamburger} onClick={toggleMenuExpanded} aria-haspopup="true" aria-expanded={isMenuExpanded}><span aria-hidden={!isMenuExpanded}><object
                        className={styles.openMenuIcon} type="image/svg+xml" data="/menu.svg"
                        title="Open Menu">Menu</object>
                    </span></button>
                    <button className={styles.navX} onClick={toggleMenuExpanded} aria-haspopup="true" aria-expanded={isMenuExpanded}><span
                        aria-hidden={!isMenuExpanded}> <object
                        className={styles.closeMenuIcon} type="image/svg+xml" data="/close.svg"
                        title="Close Menu">Close
                            Menu
                        </object></span>

                    </button>
                </div>
                <Link className={styles.navHome} href="/">
                    RÖSTER.CH
                </Link>

                <div className={styles.navmenu}>
                    <ul>
                        <li><Link onClick={() => {setIsMenuExpanded(false)}} href="/last-roast" className={pathname.startsWith("/last-roast") ? styles.active : ""}>Letzte
                            Röstung</Link></li>
                        <li><Link onClick={() => {setIsMenuExpanded(false)}} href="/next-roast" className={pathname.startsWith("/next-roast") ? styles.active : ""}>Nächste Röstung</Link></li>
                        {isSignedIn && <li><Link onClick={() => {setIsMenuExpanded(false)}} href="/profile">Profil</Link></li>}
                        {isSignedIn && <li><Link onClick={handleLogout} href="#">Logout</Link></li>}
                    </ul>
                </div>

            </nav>
        </header>
    )
}