import {useRedirectToLogin} from "@/lib/hooks/authredirect"


export default function EventsPage({session}) {
    return (
        <>
            Hello
        </>
    )

}

export async function getStaticProps(context) {
    return {
        props: {
            secured: true
        }
    }
}