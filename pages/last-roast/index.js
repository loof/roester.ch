import {useEffect, useState} from "react"
import {getLastEvent, getNextEvent} from "@/lib/api/events";
import {useSession} from "@/lib/hooks/session";
import Overview from "@/components/Overview";


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

    return (<>
        <Overview data={data} isLoading={isLoading} prefix={"war vor"} title={"Letzte Röstung"}
                  showAmountLeft={false} infoLink="/last-roast/info"/>
    </>)
}

export async function getStaticProps(context) {
    return {
        props: {
            secured: false
        }
    }
}