import {formatDate} from "@/lib/util/formatDate"
import {useEffect, useState} from "react"
import styles from "../next-roast/index.module.css"
import {getLastEvent, getNextEvent} from "@/lib/api/events";
import {useSession} from "@/lib/hooks/session";
import Button from "@/components/Button";
import Link from "next/link";


export default function LastRoastPage() {
    const [data, setData] = useState({})
    const {session, isLoaded} = useSession()
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        const loadData = async () => {
            try {
                const event = await getLastEvent()
                setData(event)
            } catch (e) {
                alert("Die letzte Röstung konnte nicht geladen werden. Bitte versuche es erneut.")
            }
        }
        loadData()
    }, [])

    useEffect(() => {
        if (!data.id) return;
        setLoading(false)
    }, [data]);


    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate = new Date(data.id ? data.date : null);
    const secondDate = new Date();

    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));

    return (
        <>
            <main className={styles.main}>
                {isLoading === false && data.id && data.id > 0 &&
                    <>

                        <article>
                            <h1>letzte röstung</h1> <p>war vor <span className={styles.accent}>{diffDays}</span> Tagen</p>
                            <p className={styles.date}>
                                <time dateTime={data.date}>{formatDate(data.date)}</time>
                            </p>

                            <Link href={`/last-roast/info`}><Button filled={false} size={"big"}>Mehr Infos</Button></Link>
                        </article>
                    </>}

                {isLoading === false && data.id === null && <p>Zurzeit sind keine Röstungen geplant.</p>}

                {isLoading === true && <p>Loading...</p>}
            </main>
        </>
    )
}

export async function getStaticProps(context) {
    return {
        props: {
            secured: false
        }
    }
}