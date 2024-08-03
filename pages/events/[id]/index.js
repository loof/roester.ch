import {useRouter} from "next/router"
import {useEffect, useState} from "react";
import {getEventById} from "@/lib/api/events";
import {formatDate} from "@/lib/util/formatDate";
import styles from "./index.module.css"
import Link from "next/link";
import Button from "@/components/Button";


export default function EventDetailPage({session}) {
    const router = useRouter()
    const [data, setData] = useState(null)

    const {id} = router.query
    useEffect(() => {
        if (!id) return
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


    return (data && <>
            <main className={styles.main}>
                <h1>{`${data.name ? `${data.name} ` : ""}${formatDate(data.date)}`}</h1>
                {data.eventProductAmounts.map((epa, i) => {
                    return (<>
                            <h2 key={i}>{epa.product.name}</h2>
                            <p>{epa.product.description}</p>

                        {epa.product.madeOf && epa.product.madeOf.length > 0 && (
                            epa.product.madeOf.map((p, i) => {
                                return <>
                                    <h3 key={`${i}`}>{p.amount}% {p.part.name}</h3>
                                    <p>{p.part.description}</p>
                                    {
                                        p.part.properties.map((prop, i) => {return <><h4 key={i}>{prop.name}</h4><p
                                            key={i}>{prop.description}</p></>
                                        })
                                    }
                                </>
                            })
                        )}

                        </>)
                })}
                <Link href={`/events/${data.id}/reserve`}><Button filled={true}
                                                                  size={"big"}>Reservieren</Button></Link>
            </main>
        </>)

}



