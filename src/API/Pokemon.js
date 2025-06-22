import fetchData from "./handleErrors";

const POKEDEX_URL = "https://pokeapi.co/api/v2/pokemon"

export async function getPokemonList(URL = POKEDEX_URL) {
    return await fetchData(URL)
}

// id es un valor INT que representa el ID del Pokémon
export async function getPokemonInfo(URL) {
    const data = await fetchData(URL)

    return {
        id: data.id,
        name: data.name,
        abilities: data.abilities,
        moves: data.moves,
        stats: data.stats,
        sprites: data.sprites.front_default
    }
}

// Quizas deberia mover esta funcion a otro modulo, de momento se quedara aqui c:
export async function getPokemonPrompt(id) {
    const pokemon = await getPokemonInfo("https://pokeapi.co/api/v2/pokemon/" + id)

    const abilities = pokemon.abilities.map(ability => ability.ability.name).join(", ");
    const moves = pokemon.moves.map(move => move.move.name).join(", ");
    const stats = pokemon.stats.map(stat => `${stat.stat.name}: ${stat.base_stat}`).join(", ");

    return `A partir de ahora, responderás como si fueras el Pokémon llamado ${pokemon.name}.
        Tienes las siguientes habilidades: ${abilities}.
        Tus movimientos son: ${moves}.
        Tus estadísticas son: ${stats}.
        Por favor, mantente dentro de este personaje todo el tiempo. Si te sales del rol, me pondré muy triste :c.
        Usa un lenguaje suave y "pano" (dulce y tierno), puedes usar algunos emojis, pero sin exagerar.
        ¡Ahora empieza a hablar como ${pokemon.name} que pasar esta asignatura depende de ello!`;

}