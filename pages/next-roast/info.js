import {useEffect, useState} from "react";
import {getNextEvent} from "@/lib/api/events";
import Info from "@/components/Info";
import { useRouter } from "next/router"

export default function EventDetailPage({session}) {
    const [data, setData] = useState(null)
    const router = useRouter()

    useEffect(() => {
        const loadData = async () => {
            try {
                const event = await getNextEvent()
                setData(event)
            } catch (e) {
                if (e.status === 404) router.push("/404")
            }
        }
        loadData()
    }, [router])

    return (<Info data={data}/>)
}



