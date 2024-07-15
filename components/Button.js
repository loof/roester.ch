import styles from "@/components/Button.module.css";


export default function Button({onClick, size, disabled, type, children}) {
    const className = `${styles[size]} ${styles["button"]}`;

    return (
        <>
            <button type={type} disabled={disabled} className={className} onClick={onClick}>{children}</button>
        </>
    )
}