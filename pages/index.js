import { formatDate } from "@/lib/util/formatDate"
import Link from "next/link"
import { useEffect, useState } from "react"
import styles from "./index.module.css"
import {getAllEvents} from "@/lib/api/events";
import {useSession} from "@/lib/hooks/session";

export default function IndexPage() {
  const [data, setData] = useState([])
  const { session, isLoaded } = useSession()

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const events = await getAllEvents(session.accessToken)
        setData(events)
      } catch (e) {
        alert("Could not load events!")
      }
    }
    loadEvents()
  }, [])

  return (
      <div className={styles.events}>
        <h1>Welcome to my blog!</h1>
        {
          data.events && isLoaded && data.events.map(event => {
            return (
                <article key={event.id}>
                  <h2>
                    {event.name}
                    <span className={styles.date}>
                                    {formatDate(event.date)}
                                </span>
                  </h2>

                  <p>{event.description.substring(0, 600) + "..."}</p>

                  <Link href={`/events/${event.id}`} className={styles.readmore}>
                    Read more
                  </Link>
                </article>
            )
          })
        }
      </div>
  )
}