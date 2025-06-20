async function fetchData(url, options = {}) {
    try {
        const response = await fetch(url, options)

        if (!response.ok) {
            throw new Error(`Error al consultar la API (${url}): Status=${response.status} ${response.statusText}`)
        }

        return await response.json()
    } catch (error) {
        throw new Error("La consulta a la API ha fallado por un motivo ambiguo. :c\n" + error)
    }
}

export default fetchData