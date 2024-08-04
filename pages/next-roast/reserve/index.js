import {useEffect, useState} from "react"
import {getNextEvent} from "@/lib/api/events";
import styles from "./index.module.css"



export default function NextRoastPage() {
    const [data, setData] = useState({})
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

    return (<>
    <main className={styles.main}>
        <p>hi</p>
    </main>
    </>)
}

export async function getStaticProps(context) {
    return {
        props: {
            secured: true
        }
    }
}