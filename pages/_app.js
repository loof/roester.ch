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



    return isLoaded && (
        <>
            <Head>
                <title>RÖSTER.CH</title>
            </Head>

            {
                <Header/>}


                {(!pageProps.secured || isSignedIn) && <Component {...pageProps}/>}


            {/*<footer className={`footer`}>hello</footer>*/}
        </>
    )
}