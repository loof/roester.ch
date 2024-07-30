import {login, signup} from "@/lib/api/auth"
import { useSession } from "@/lib/hooks/session"
import { useRouter } from "next/router"
import { useState } from "react"
import styles from "./register.module.css"
import Button from "@/components/Button";
import Link from "next/link";

const defaultModel = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    password_confirmation: "",
}

function validateModel(model) {
    const errors = {
        email: "",
        firstname: "",
        lastname: "",
        password: ""
    }

    let isValid = true

    if (model.email.trim().length === 0 || !model.email.includes("@")) {
        errors.email = "Die E-Mail-Adresse muss gültig sein und darf nicht leer sein."
        isValid = false
    }

    if (model.password.trim().length === 0 || model.password.length < 7) {
        errors.password = "Passwort darf nicht leer sein und muss mindestens 8 Zeichen beinhalten."
        isValid = false
    }

    if (model.password.trim() !== model.password_confirmation.trim()) {
        errors.password = "Die Passwörter stimmen nicht überein."
        isValid = false
    }

    if (model.firstname.trim().length === 0) {
        errors.firstname = "Vorname darf nicht leer sein."
        isValid = false;
    }

    if (model.lastname.trim().length === 0) {
        errors.lastname = "Nachname darf nicht leer sein."
        isValid = false;
    }

    return { errors, isValid }
}

export default function RegisterPage() {
    const { session, signIn } = useSession()
    const router = useRouter()
    const [errors, setErrors] = useState(defaultModel)
    const [isLoading, setIsLoading] = useState(false)
    const [model, setModel] = useState(defaultModel)

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value?.trim()

        setModel({
            ...model,
            [name]: value
        })
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
            //const resp = await login(model)
            //signIn(resp)
            //const url = router.query.url
            //if(url) {
            //    router.push(url)
            //}  else {
            //    router.push("/")
            //}
            const respSignUp = await signup(model)

            const respLogin = await login(model)
            await router.push("/verify-info")
        } catch (e) {
            setErrors({
                ...errors,
                login: "Registrierung fehlgeschlagen."
            })
            setIsLoading(false)
        }
    }


    return session.user ? null : (
        <div className={styles.login}>
            <h1>Registrieren</h1>

            {errors.login && <h2 className={styles.error}>{errors.login}</h2>}

            <form onSubmit={handleSubmit} className={styles.loginform}>
                <fieldset>
                    <label>e-mail</label>
                    <input type="text" name="email" onChange={handleChange} value={model.email} autoComplete="email"
                           required/>
                    {errors.email && <div className={styles.error}>{errors.email}</div>}
                </fieldset>

                <fieldset>
                    <label>vorname</label>
                    <input type="text" name="firstname" onChange={handleChange} value={model.firstname}
                           autoComplete="firstname"
                           required/>
                    {errors.firstname && <div className={styles.error}>{errors.firstname}</div>}
                </fieldset>

                <fieldset>
                    <label>nachname</label>
                    <input type="text" name="lastname" onChange={handleChange} value={model.lastname}
                           autoComplete="lastname"
                           required/>
                    {errors.lastname && <div className={styles.error}>{errors.lastname}</div>}
                </fieldset>

                <fieldset>
                    <label>passwort</label>
                    <input type="password" name="password" onChange={handleChange} value={model.password}
                           autoComplete="password" required/>
                    {errors.password &&
                        <div className={styles.error}>{errors.password} {errors.password_confirmation}</div>}
                </fieldset>

                <fieldset>
                    <label>passwort wiederholung</label>
                    <input type="password" name="password_confirmation" onChange={handleChange}
                           value={model.password_confirmation}
                           autoComplete="password_confirmation" required/>
                    {errors.password &&
                        <div className={styles.error}>{errors.password} {errors.password_confirmation}</div>}
                </fieldset>

                <fieldset>
                    <Button filled={true} disabled={isLoading} type="submit" size="medium">
                        {isLoading ? "Loading..." : "Registrieren"}
                    </Button>

                </fieldset>
            </form>
        </div>
    )
}

export async function getStaticProps(context) {
    return {
        props: {
            secured: false
        }
    }
}