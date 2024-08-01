import {formatDate} from "@/lib/util/formatDate"
import {useEffect, useState} from "react"
import styles from "./index.module.css"
import {getNextEvent} from "@/lib/api/events";
import {useSession} from "@/lib/hooks/session";
import AmountLeft from "@/components/AmountLeft";
import Varieties from "@/components/Varieties";


export default function IndexPage() {
    const [data, setData] = useState({})
    const {session, isLoaded} = useSession()
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        const loadData = async () => {
            try {
                const event = await getNextEvent()
                setData(event)
            } catch (e) {
                alert("Die nächste Röstung konnte nicht geladen werden. Bitte versuche es erneut.")
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

    return (<>
            <main className={styles.main}>
                {isLoading === false && data.id && data.id > 0 && <>

                    <article>
                        <h1>Nächste Röstung</h1> <p>in <span
                        className={styles.accent}>{diffDays > 1 ? diffDays : "einem"}</span> {diffDays > 1 ? "Tagen" : "Tag"}
                    </p>
                        <p className={styles.date}>
                            <time dateTime={data.date}>{formatDate(data.date)}</time>
                        </p>
                        {(data.eventProductAmounts && data.eventProductAmounts.length > 0) && <>
                            <Varieties eventProductAmount={data.eventProductAmounts}/>
                            <AmountLeft eventProductAmount={data.eventProductAmounts[0]}/>
                        </>


                        }

                    </article>
                    <button className={styles.join}>reservieren</button>
                </>}

                {isLoading === false && data.id === null && <p>zurzeit sind keine röstungen geplant</p>}

                {isLoading === true && <p>Loading...</p>}
            </main>
        </>)
}

export async function getStaticProps(context) {
    return {
        props: {
            secured: false
        }
    }
}