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
        if (!data) return;
        setLoading(false)
    }, [data]);


    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate = new Date(data.id ? data.date : null);
    const secondDate = new Date();

    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));

    return (
        <>
            {isLoading === false && data.id && data.id > 0 &&
                <article>
                    <h2>nächste röstung</h2> <p>in <span className={styles.accent}>{diffDays}</span> Tagen</p>
                    <p className={styles.date}> {formatDate(data.date)}</p><p
                    className={styles.amountLeft}>{data.amountLeft} kg übrig</p>
                    <button className={styles.button}>join</button>
                </article>}

            {isLoading === false && data.id === null && <p>zurzeit sind keine röstungen geplant</p>}

            {isLoading === true && <p>Loading...</p>}
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