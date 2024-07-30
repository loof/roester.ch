import {formatDate} from "@/lib/util/formatDate"
import {useEffect, useState} from "react"
import styles from "./index.module.css"
import {getLastEvent, getNextEvent} from "@/lib/api/events";
import {useSession} from "@/lib/hooks/session";


export default function LastRoastPage() {
    const [data, setData] = useState({})
    const {session, isLoaded} = useSession()
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        const loadNextEvent = async () => {
            try {
                const event = await getLastEvent()
                setData(event)
            } catch (e) {
                alert("Could not load next event!")
            }
        }
        loadNextEvent()
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
                        </article>
                    </>}

                {isLoading === false && data.id === null && <p>zurzeit sind keine röstungen geplant</p>}

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