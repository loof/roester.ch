import {useEffect, useState} from "react";
import {formatDate} from "@/lib/util/formatDate";
import styles from "./info.module.css"
import Link from "next/link";
import Button from "@/components/Button";
import Properties from "@/components/Properties";
import {getNextEvent} from "@/lib/api/events";
import {router} from "next/client";


export default function EventDetailPage({session}) {
    const [data, setData] = useState(null)

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
    }, [])


    return (data && <>
            <main className={styles.main}>
                <h1>{`${data.name ? `${data.name} ` : ""}${formatDate(data.date)}`}</h1>
                {data.description && <p>{data.description && (data.description)}</p>}
                {data.eventProductAmounts.map((epa, i) => {
                    return (<>
                               <h2 key={i}>{epa.product.madeOf && epa.product.madeOf.length === 0 ? `100% ${epa.product.tags.find(t => {return t.name === "Arabica" || t.name === "Robusta"}).name} ` : ""}{epa.product.name}</h2>
                            <p>{epa.product.description}</p>

                        {epa.product.madeOf && epa.product.madeOf.length > 0 && (
                            epa.product.madeOf.map((p, i) => {
                                return <>
                                    <h3 key={`${i}`}>{p.amount}% {p.part.name}</h3>
                                    <p>{p.part.description}</p>
                                    {
                                        <Properties properties={p.part.properties}/>
                                    }
                                </>
                            })
                        )}
                        {epa.product.madeOf && epa.product.madeOf.length === 0 && (
                            <Properties properties={epa.product.properties}/>
                        )}
                    </>)
                })}
                <Link href={`/events/${data.id}/reserve`}><Button filled={true}
                                                                  size={"big"}>Reservieren</Button></Link>
            </main>
        </>)

}


