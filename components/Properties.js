
export default function Properties({properties}) {
    return (
            properties.map((prop, i) => {return <><h4 key={i}>{prop.name}</h4><p
                key={i}>{prop.description}</p></>
            })

    )
}