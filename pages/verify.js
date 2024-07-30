import styles from "./verify.module.css"

import {useEffect, useState} from "react";
import {verify} from "@/lib/api/auth";
import {useRouter} from "next/router";

export default function VerifyPage() {
    const router = useRouter();
    const { query } = router;

    const defaultModel = {
        message: ""
    }

    const [errors, setErrors] = useState(defaultModel)
    const [isLoading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        if (!query.code) return

        const verifyCode = async () => {
            try {
                setIsLoading(true)
                await verify(query.code)
                setIsLoading(false)
                setSuccess(true)

                //await router.push("/")
            } catch (e) {
                setErrors({
                    message: "Bei der Verifizierung ist ein Fehler aufgetreten. Bitte versuche es erneut."
                })
            }

        }

        verifyCode()
    }, [router]);

    return (
        <>
            <main className={styles.main}>
                {
                    isLoading === true &&  (<p>Loading...</p>)
                }
                {
                    isLoading === false && errors.message.length > 0 && (<p>{errors.message}</p>)
                }
                {
                    isLoading === false && errors.message.length === 0 && (<p>{errors.message}</p>)
                }
                {
                    isLoading === false && success === true && (<p>Dein Konto wurde erfolgreich verifiziert.</p>)
                }
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