

export default function EventDetailPage({session}) {
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