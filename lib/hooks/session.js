import { atom, useAtom } from "jotai"
import { useEffect } from "react"

const STORAGE_KEY = "session"

const defaultSession = {
    email: null,
    accessToken: null
}

const sessionAtom = atom(defaultSession)
const isLoadingAtom = atom(true)

export function useSession() {
    const [session, setSession] = useAtom(sessionAtom)
    const [isLoading, setIsLoading] = useAtom(isLoadingAtom)

    useEffect(() => {
        const savedSession = localStorage.getItem(STORAGE_KEY);
        if (savedSession) {
            try {
                setSession(JSON.parse(savedSession));
            } catch (e) {
                console.error(e);
            }
        }
        setIsLoading(false)
    }, []);

    const signIn = (session) => {
        if (!session.accessToken || !session.email) {
            throw new Error("Token and email must be supplied to signIn()!")
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
        setSession(session)
    }

    const signOut = () => {
        localStorage.removeItem(STORAGE_KEY);
        setSession(defaultSession)
    }
    
    return {
        session,
        isLoaded: !isLoading,
        isSignedIn: session.email !== null && session.accessToken !== null,
        signIn,
        signOut
    }
}