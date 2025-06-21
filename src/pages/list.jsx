import './list.css'
import {useEffect, useState} from 'react'
import { getPokemonList } from '../API/Pokemon.js'
import { getPokemonInfo } from '../API/Pokemon.js'
import Checkbox from './icons/heart.jsx'

function List() {
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [list, setList] = useState([]);
  const [details, setDetails] = useState([]);

  useEffect(() => {
    loadState();
  }, []);

  async function loadState(URL) {
    try {
      const pokemons = await getPokemonList(URL);
      console.log(pokemons)
      setNextPage(pokemons.next)
      setPrevPage(pokemons.previous);
      setList(pokemons.results);

      const pokemonDetails = pokemons.results.map(pokemon => getPokemonInfo(pokemon.url))
      const resolverPromeses = await Promise.all(pokemonDetails);
      setDetails(resolverPromeses);
    } catch (error) {
      console.error("Error al cargar la lista de Pokémon:", error);
    }
  }

  if (list.length === 0 || details.length === 0) {
    return <p>Cargando lista de Pokémon...</p>;
  }
  
return (
    <>
      <ul id="pokelist">
        {details.map((info, index) => {
          return (
            <li key={info.id}>
              <Checkbox/>
              <div>
                <img src={info.sprites} alt={info.name} />
              </div>
              <div>
                <h2>{info.name.charAt(0).toUpperCase() + info.name.slice(1)}</h2>
              </div>
              <div>
                <button id="chat">Conversar</button>
              </div>
            </li>
          )
        })}
      </ul>
      <footer>
        <button id="prev" onClick={() => loadState(prevPage)} disabled={!prevPage}>Pagina anterior</button>
        <p id="pagCount">a</p>
        <button id="next" onClick={() => loadState(nextPage)} disabled={!nextPage}>Siguiente pagina</button>
    </footer>
    </>
  )
}

export default List;