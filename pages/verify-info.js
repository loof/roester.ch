import styles from "./verify-info.module.css"

export default function VerifyInfoPage() {


    return (
        <>
            <main className={styles.main}>

                <h1>Validierung deines Kontos</h1>
                <p>Du hast eine E-Mail an deine angegebene E-Mail-Adresse erhalten.</p>
                <p>Klicke den Link im E-Mail, um
                    dein Konto zu validieren.</p>

            </main>
        </>

    )
}

export async function getStaticProps(context) {
    return {
        props: {
            secured: false
        }
    }
}