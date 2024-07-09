import Header from "@/components/Header"
import {useSession} from "@/lib/hooks/session"
import {useAuthRedirect} from "@/lib/hooks/authredirect"
import "../styles/globals.css"
import "./_app.css"
import Head from 'next/head'
import {useEffect} from "react";


export default function App({Component, pageProps}) {
    const {isLoaded, isSignedIn} = useSession()
    useAuthRedirect(pageProps)

    useEffect(() => {
        window.addEventListener('resize', function(event){
            document.getElementById("header").classList.remove("menu-expanded");
        });
    }, []);

    return isLoaded && (
        <>
            <Head>
                <title>RÖSTER.CH</title>
            </Head>

            {
                <Header/>}

            <main className={`page`}>
                {(!pageProps.secured || isSignedIn) && <Component {...pageProps}/>}
            </main>
        </>
    )
}