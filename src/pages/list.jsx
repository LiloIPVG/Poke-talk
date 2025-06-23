import './list.css'
import { useEffect, useState } from 'react'
import { getPokemonList, getPokemonInfo } from '../API/Pokemon'
import { NavLink } from "react-router"

import PokemonList from '../components/PokemonList'
import Footer from '../components/Footer'


function List() {
  const [totalCount, setTotalCount] = useState()
  const [details, setDetails] = useState([])
  const [globalResults, setGlobalResults] = useState([])
  const [sortAsc, setSortAsc] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false)
  const limit = 20

  const totalPages = Math.ceil(totalCount / limit)
  const isSearching = search.trim() !== ""

  useEffect(() => {
    fetchTotalCount()
  }, [])

  useEffect(() => {
    if (isSearching) {
      Search()
    } else {
      fetchPageDetails()
    }
  }, [search, currentPage, sortAsc])

  async function fetchTotalCount() {
    const response = await getPokemonList(`https://pokeapi.co/api/v2/pokemon?limit=1`)
    setTotalCount(response.count)
  }

  function getOffset() { //https://stackoverflow.com/questions/27992413/how-do-i-calculate-the-offsets-for-pagination
    if (sortAsc) {
      return (currentPage - 1) * limit
    }
    
    const offset = totalCount - currentPage * limit
    return offset > 0 ? offset : 0
  }

  function getPageLimit() {
    if (currentPage === totalPages) {
      return totalCount - (currentPage - 1) * limit
    }
    
    return limit
  }

  function sortPokemonsById(list) {
    const orderList = list
    return orderList.sort((a, b) =>
      sortAsc ? 
      a.id - b.id : 
      b.id - a.id
    )
  }

  async function fetchPageDetails() {
    setLoading(true)
    const offset = getOffset()
    const pageLimit = getPageLimit()
    const results = await getPokemonList(`https://pokeapi.co/api/v2/pokemon?limit=${pageLimit}&offset=${offset}`)
    const ordered = sortAsc ? results.results : results.results.reverse()
    const pokemonDetails = await Promise.all(ordered.map(pokemon => getPokemonInfo(pokemon.url)))
    setDetails(pokemonDetails)
    setLoading(false)
  }

  async function Search() {
    setLoading(true)
    setGlobalResults([])

    // Buscar en toda la Pokédex usando el total real de Pokémon para el límite
    const allPokemons = await getPokemonList(`https://pokeapi.co/api/v2/pokemon?limit=${totalCount}`)
    const matches = allPokemons.results.filter(poke =>
      poke.name.toLowerCase().includes(search.toLowerCase())
    )

    if (matches.length === 0) {
      setGlobalResults([])
      setLoading(false)
      return
    }

    const pokemonDetails = await Promise.all(matches.map(p => getPokemonInfo(p.url)))
    const sorted = sortPokemonsById(pokemonDetails)
    setGlobalResults(sorted)
    setLoading(false)
  }

  const pokemonsToShow = isSearching ? globalResults : details

  if (totalCount === 0 || (!isSearching && details.length === 0)) {
    return <p>Cargando lista de Pokémon...</p>
  }

  return (
    <>
      <nav id="filters">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div>
          <span>Ordenar: </span>
          <button onClick={() => setSortAsc(!sortAsc)}>
            {sortAsc ? "descendente" : "ascendente"}
          </button>
        </div>
      </nav>

      <main>
        <ul id="pokelist">
          <PokemonList loading={loading} pokemons={pokemonsToShow} />
        </ul>
      </main>
      <Footer currentPage={currentPage} setCurrentPage={setCurrentPage} isSearching={isSearching} totalPages={totalPages}/>
    </>
  )
}

export default List