import {useEffect, useState} from "react"
import {getNextEvent} from "@/lib/api/events";
import styles from "./index.module.css"
import Button from "@/components/Button";
import Link from "next/link";
import {login} from "@/lib/api/auth";

const defaultModel = {
    messages: []
}

export default function NextRoastPage() {


    const [data, setData] = useState({})
    const [isLoading, setLoading] = useState(true)
    const [errors, setErrors] = useState(defaultModel)

    useEffect(() => {
        const loadData = async () => {
            try {
                const event = await getNextEvent()
                setData(event)
            } catch (e) {
                alert("Die nächste Röstung konnte nicht geladen werden. Bitte versuche es erneut.")
            }
        }
        loadData()
    }, [])

    useEffect(() => {
        if (!data.id) return;
        setLoading(false)
    }, [data]);

    function validateModel(model) {
        const errors = {
            messages: ""
        }
        let isValid = true



        return { errors, isValid }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setErrors(defaultModel)

        const result = validateModel(model)

        if (!result.isValid) {
            setErrors(result.errors)
            setIsLoading(false)
            return
        }

        try {

        } catch (e) {
            setErrors({
                messages: [...errors.messages, e.message]

            })
            setIsLoading(false)
        }
    }

    return (<>
        <main className={styles.main}>
            <h1>Reserviere deinen Kaffee</h1>
            <form onSubmit={handleSubmit} className={styles.loginform}>
                <fieldset>
                    <label>Kaffe 1</label>
                    <select id='country' value={country} onChange={handleCountryChange}>
                        <option value=''>--Choose a Country--</option>
                        <option value='USA'>USA</option>
                        <option value='Canada'>Canada</option>
                    </select>

                </fieldset>


                <fieldset>
                    <Button filled={true} disabled={isLoading} type="submit" size="medium">
                        {isLoading ? "Loading..." : "Reservieren"}
                    </Button>

                </fieldset>
            </form>
        </main>
    </>)
}

export async function getStaticProps(context) {
    return {
        props: {
            secured: true
        }
    }
}