import { useRouter } from "next/router"
import {useEffect, useState} from "react";
import {getEventById} from "@/lib/api/events";
import {formatDate} from "@/lib/util/formatDate";


export default function EventDetailPage({session}) {
    const router = useRouter()
    const [data, setData] = useState(null)

    const { id } = router.query
    useEffect(() => {
        if(!id) return
        const loadData = async () => {
            try {
                const event = await getEventById(id)
                setData(event)
            } catch (e) {
                if (e.status === 404) router.push("/404")
            }
        }
        loadData()
    }, [id])


    return ( data &&
        <>
            <h1>{`${data.name ? data.name : ""} ${formatDate(data.date)}`}</h1>

        </>
    )

}



