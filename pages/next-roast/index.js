import {useEffect, useState} from "react"
import {getNextEvent} from "@/lib/api/events";
import Overview from "@/components/Overview";


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
        <Overview isBookable={true} data={data} isLoading={isLoading} prefix={"in"} title={"Nächste Röstung"}
                  showAmountLeft={true} infoLink="/next-roast/info" reserveLink="/next-roast/reserve"/>
    </>)
}

export async function getStaticProps(context) {
    return {
        props: {
            secured: false
        }
    }
}