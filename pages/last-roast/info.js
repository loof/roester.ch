
import {useEffect, useState} from "react";
import {getLastEvent} from "@/lib/api/events";
import {useRouter} from "next/router";
import Info from "@/components/Info";


export default function EventDetailPage({session}) {
    const [data, setData] = useState(null)
    const router = useRouter()

    useEffect(() => {
        const loadData = async () => {
            try {
                const event = await getLastEvent()
                setData(event)
            } catch (e) {
                if (e.status === 404) router.push("/404")
            }
        }
        loadData()
    }, [router])

    return (<Info data={data}/>)
}



