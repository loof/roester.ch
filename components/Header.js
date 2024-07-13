import styles from "./Header.module.css"
import Link from "next/link";

export default function Header({children}) {
    return (
        <header id="header">
            <nav>

                <div className="buttons">
                    <button id="nav-hamburger" onClick={() => {
                        document.getElementById("header").classList.add("menu-expanded");
                    }} aria-haspopup="true" aria-expanded="false"><span aria-hidden="true"><object
                        id="menu-icon" type="image/svg+xml" data="/menu.svg" title="Menu Icon">Menu</object>
                    </span></button>
                    <button id="nav-x" onClick={() => {
                        document.getElementById("header").classList.remove("menu-expanded");
                    }} aria-haspopup="true" aria-expanded="true"><span
                        aria-hidden="true"> <object
                        id="close-menu-icon" type="image/svg+xml" data="/close.svg"
                        title="Close Meue Icon">Close
                            Menu
                        </object></span>

                    </button>
                </div>
                <Link id="nav-home" href="/">
                    RÖSTER.CH
                </Link>

                <div className="navmenu">
                    <ul>
                        <li><Link href="/" className="active">Nächste Röstung</Link></li>
                        <li><Link href="/profile">Profil</Link></li>
                        <li><Link href="/logout">Logout</Link></li>
                    </ul>
                </div>

            </nav>
        </header>
    )
}