import styles from "./Overview.module.css"
import {formatDate} from "@/lib/util/formatDate";
import Link from "next/link";
import Button from "@/components/Button";
import AmountLeft from "@/components/AmountLeft";
import DiffDays from "@/components/DiffDays";

export default function Overview({title, prefix, data, isLoading, isBookable = false, showAmountLeft = false, infoLink}) {


    return (<>

        <main className={styles.main}>
            {isLoading === false && data.id && data.id > 0 && <>

                <article>
                    <h1>{title}</h1>
                    <DiffDays prefix={prefix} data={data} />
                    <p className={styles.date}>
                        <time dateTime={data.date}>{formatDate(data.date)}</time>
                    </p>
                    {(data.eventProductAmounts && data.eventProductAmounts.length > 0) && <>

                    {showAmountLeft && <AmountLeft event={data}/>}
                    </>


                    }

                    <div className={styles.buttons}>
                        <Link href={infoLink}><Button filled={false} size={"big"}>Mehr Infos</Button></Link>

                        {isBookable && <Link href={`/events/${data.id}/reserve`}><Button filled={true}
                                                                                         size={"big"}>Reservieren</Button></Link>}
                    </div>

                </article>


            </>}

            {isLoading === false && data.id === null && <p>Zurzeit sind keine Röstungen geplant.</p>}

            {isLoading === true && <p>Loading...</p>}
        </main>
    </>)

}