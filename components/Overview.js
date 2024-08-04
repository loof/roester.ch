import styles from "./Overview.module.css"
import {formatDate} from "@/lib/util/formatDate";
import Link from "next/link";
import Button from "@/components/Button";
import AmountLeft from "@/components/AmountLeft";
import DiffDays from "@/components/DiffDays";

export default function Overview({
                                     title,
                                     prefix,
                                     data,
                                     isLoading,
                                     isBookable = false,
                                     showAmountLeft = false,
                                     infoLink,
                                     reserveLink
                                 }) {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate = new Date(data.id ? data.date : null);
    const secondDate = new Date();
    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
    const isClosed = diffDays <= data.daysBeforeSubscriptionCloses
    console.log(isClosed)

    return (<>

        <main className={styles.main}>
            {isLoading === false && data.id && data.id > 0 && <>

                <article>
                    <h1>{title}</h1>
                    <DiffDays prefix={prefix} data={data}/>
                    <p className={styles.date}>
                        <time dateTime={data.date}>{formatDate(data.date)}</time>
                    </p>
                    {(data.eventProductAmounts && data.eventProductAmounts.length > 0) && <>

                        {showAmountLeft && <AmountLeft event={data}/>}
                    </>


                    }

                    <div className={styles.buttons}>
                        <Link href={infoLink}><Button filled={false} size={"big"}>Mehr Infos</Button></Link>

                        {isBookable && !isClosed && <Link href={reserveLink}><Button filled={true}
                                                                        size={"big"}>Reservieren</Button></Link>}

                        {isClosed && <p>Reservation nicht mehr möglich</p>}
                    </div>

                </article>


            </>}

            {isLoading === false && data.id === null && <p>Zurzeit sind keine Röstungen geplant.</p>}

            {isLoading === true && <p>Loading...</p>}
        </main>
    </>)

}