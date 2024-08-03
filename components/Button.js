import styles from "@/components/Button.module.css";


export default function Button({onClick, size = "medium", disabled, type = "button", children, filled}) {
    const classNames = `${styles[size]} ${styles.button} ${filled ? styles.filled : styles.bordered}`;

    return (
        <>
            <button type={type} disabled={disabled} className={classNames} onClick={onClick}>{children}</button>
        </>
    )
}