import fetchData from "./handleErrors";

const POKEDEX_URL = "https://pokeapi.co/api/v2/pokemon"

export async function getPokemonList() {
    return await fetchData(POKEDEX_URL)
}

// id es un valor INT que representa el ID del Pokémon
export async function getPokemonInfo(id) {
    const URL = `${POKEDEX_URL}/${id}/`
    const data = await fetchData(URL)

    return [
        abilities = data.abilities,
        moves = data.moves,
        stats = data.stats
    ]
}