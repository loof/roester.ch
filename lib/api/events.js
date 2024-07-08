const URL = process.env.NEXT_PUBLIC_API_URL

export async function getAllEvents(token) {
    const response = await fetch(`${URL}/events`, {
        headers: {
            "content-type": "application/json",
            "authorization": `Bearer ${token}`
        }
    })

    if (!response.ok) {
        throw new Error("An error occurred while fetching")
    }

    const data = await response.json()
    return data
}

export async function getNextEvent(token) {
    const response = await fetch(`${URL}/events/next`, {
        headers: {
            "content-type": "application/json",
            "authorization": `Bearer ${token}`
        }
    })

    if (!response.ok) {
        throw new Error("An error occurred while fetching")
    }

    const data = await response.json()
    return data
}

export async function getEventById(id) {
    const response = await fetch(`${URL}/events/${id}`)

    if (!response.ok) {
        throw new Error("An error occured while fetching")
    }

    const data = await response.json()
    return data
}
