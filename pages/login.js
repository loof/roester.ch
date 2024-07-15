import { login } from "@/lib/api/auth"
import { useSession } from "@/lib/hooks/session"
import { useRouter } from "next/router"
import { useState } from "react"
import styles from "./login.module.css"
import Button from "@/components/Button";

const defaultModel = {
    email: "",
    password: ""
}

function validateModel(model) {
    const errors = {
        email: "",
        password: ""
    }
    let isValid = true

    if (model.email.trim().length === 0 || !model.email.includes("@")) {
        errors.email = "Email can't be empty and must be valid email"
        isValid = false
    }

    if (model.password.trim().length === 0 || model.password.length < 7) {
        errors.password = "Password can't be empty and must be at least 8 characters long"
        isValid = false
    }

    return { errors, isValid }
}

export default function LoginPage() {
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
            const resp = await login(model)
            signIn(resp)
            const url = router.query.url
            if(url) {
                router.push(url)
            }  else {
                router.push("/")
            }
        } catch (e) {
            setErrors({
                ...errors,
                login: "Login failed"
            })
            setIsLoading(false)
        }
    }

    return session.user ? null : (
        <div className={styles.login}>
            <h1>Login</h1>

            {errors.login && <h2 className={styles.error}>{errors.login}</h2>}

            <form onSubmit={handleSubmit} className={styles.loginform}>
                <fieldset>
                    <label>e-mail</label>
                    <input type="text" name="email" onChange={handleChange} value={model.email} autoComplete="email" required />
                    {errors.email && <div className={styles.error}>{errors.email}</div>}
                </fieldset>

                <fieldset>
                    <label>passwort</label>
                    <input type="password" name="password" onChange={handleChange} value={model.password} autoComplete="current-password" required />
                    {errors.password && <div className={styles.error}>{errors.password}</div>}
                </fieldset>

                <fieldset>
                    <Button disabled={isLoading} type="submit" size="medium">
                        {isLoading ? "Loading..." : "Login"}
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