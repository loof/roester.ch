import styles from "@/components/Button.module.css";


export default function Button({onClick, size = "medium", disabled = false, type = "button", children, filled, customStyles}) {
    const classNames = `${styles[size]} ${styles.button} ${filled ? styles.filled : styles.bordered}`;

    return (
        <>
            <button style={customStyles} type={type} className={classNames} onClick={onClick}>{children}</button>
        </>
    )
}