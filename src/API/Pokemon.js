import fetchData from "./handleErrors";

const POKEDEX_URL = "https://pokeapi.co/api/v2/pokemon"

export async function getPokemonList(URL = POKEDEX_URL) {
    return await fetchData(URL)
}

// id es un valor INT que representa el ID del Pokémon
export async function getPokemonInfo(URL) {
    const data = await fetchData(URL)

    return {
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

    return `Desde ahora responderas como el pokemon llamado ${pokemon.name}, tiene las siguientes habilidades: ${abilities}. Sus movimientos son: ${moves}. Sus estadísticas son: ${stats}, si no respondes correctamente me sentire muy triste entonces por el bien estar emocional de mi persona por favor solo responde con el entorno que te he presentado :c`;

}