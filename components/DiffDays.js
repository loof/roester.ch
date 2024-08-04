import styles from "@/components/Overview.module.css";

export default function DiffDays({prefix, data}) {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate = new Date(data.id ? data.date : null);
    const secondDate = new Date();
    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));

    return (<p>{prefix} <span
        className={styles.accent}>{diffDays > 1 ? diffDays : "einem"}</span> {diffDays > 1 ? "Tagen" : "Tag"}
    </p>)
}