import {formatDate} from "@/lib/util/formatDate"
import {useEffect, useState} from "react"
import styles from "./index.module.css"
import {getNextEvent} from "@/lib/api/events";
import {useSession} from "@/lib/hooks/session";


export default function IndexPage() {
    const [data, setData] = useState({})
    const {session, isLoaded} = useSession()
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        const loadNextEvent = async () => {
            try {
                const event = await getNextEvent(session.accessToken)
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
                            <h1>nächste röstung</h1> <p>in <span className={styles.accent}>{diffDays}</span> Tagen</p>
                            <p className="date">
                                <time dateTime="2024-09-14">{formatDate(data.date)}</time>
                            </p>
                            <p className="amount-left">{data.amountLeft} kg vorrat</p>
                        </article>
                        <button className={styles.join}>join</button>
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
            secured: true
        }
    }
}