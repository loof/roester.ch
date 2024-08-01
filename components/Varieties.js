import styles from "@/components/Varieties.module.css";

export default function Varieties({eventProductAmount}) {

    return (
            eventProductAmount && eventProductAmount.length > 0 &&

            eventProductAmount[0].product.madeOf && eventProductAmount[0].product.madeOf.length > 0 ?
                //Mapping over subproducts and display percentage of either robusta or arabica.
                <p>{eventProductAmount[0].product.madeOf.map((p, i) => {
                    return (<><span
                        className={styles.accent}>{p.amount}%</span> {p.part.properties.find((property) => property.name === "variety").description}{i !== eventProductAmount[0].product.madeOf.length - 1 &&
                        <br/>}</>)
                })}
                </p> : <p> <span
                    className={styles.accent}>100%</span> {eventProductAmount[0].product.properties.find((p) => {return p.name === "variety"}).description}
                </p>



    )
}