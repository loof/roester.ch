import {formatDate} from "@/lib/util/formatDate"
import Link from "next/link"
import {useEffect, useState} from "react"
import styles from "./index.module.css"
import {getAllEvents} from "@/lib/api/events";
import {useSession} from "@/lib/hooks/session";


export default function IndexPage() {
    const [data, setData] = useState([])
    const {session, isLoaded} = useSession()

    useEffect(() => {
        const loadEvents = async () => {
            try {
                const events = await getAllEvents(session.accessToken)
                setData(events)
            } catch (e) {
                alert("Could not load events!")
            }
        }
        loadEvents()
    }, [])


    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate = new Date(data.events ? data.events[0].date : null);
    const secondDate = new Date();

    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));

    return (
        <>
            {

                data.events && data.events.length > 0 ?
                    <>
                        <h2>nächste röstung</h2> <p>in <span className={styles.accent}>{diffDays}</span> Tagen</p><p> {formatDate(data.events[0].date)}</p><p>{data.events[0].amountLeft} kg übrig</p></> :
                    <p>zurzeit sind keine events geplant.</p>

            }
        </>
    )
}