import styles from "./Header.module.css"
import Link from "next/link";
import {useEffect, useState} from "react";
import {useSession} from "@/lib/hooks/session";
import { useRouter } from 'next/navigation'

export default function Header({children}) {
    const [isMenuExpanded, setIsMenuExpanded] = useState(false);
    const menuClassname = isMenuExpanded ? `${styles["menuExpanded"]} ${styles["header"]}` : `${styles["header"]}`;
    const { session, signOut } = useSession()
    const router = useRouter()
    const toggleMenuExpanded = () => {
        setIsMenuExpanded(!isMenuExpanded)
    }

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

    return (
        <header className={menuClassname}>
            <nav className={styles.nav}>

                <div className={styles.buttons}>
                    <button className={styles.navHamburger} onClick={toggleMenuExpanded} aria-haspopup="true" aria-expanded="false"><span aria-hidden="true"><object
                        className={styles.openMenuIcon} type="image/svg+xml" data="/menu.svg"
                        title="Menu Icon">Menu</object>
                    </span></button>
                    <button className={styles.navX} onClick={toggleMenuExpanded} aria-haspopup="true" aria-expanded="true"><span
                        aria-hidden="true"> <object
                        className={styles.closeMenuIcon} type="image/svg+xml" data="/close.svg"
                        title="Close Meue Icon">Close
                            Menu
                        </object></span>

                    </button>
                </div>
                <Link className={styles.navHome} href="/">
                    RÖSTER.CH
                </Link>

                <div className={styles.navmenu}>
                    <ul>
                        <li><Link href="/" className={styles.active}>Nächste Röstung</Link></li>
                        <li><Link href="/profile">Profil</Link></li>
                        <li><Link onClick={handleLogout} href=" ">Logout</Link></li>
                    </ul>
                </div>

            </nav>
        </header>
    )
}