import { NavLink } from 'react-router'
import Checkbox from '../pages/icons/heart.jsx'


function PokemonList({ loading, pokemons }) {
  if (loading) {
    return <li style={{ color: "gray" }}>Buscando en toda la Pokédex...</li>
  }
  if (pokemons.length === 0) {
    return <li style={{ color: "red" }}>No se encontró ningún Pokémon.</li>
  }

  return pokemons.map(poke => (
    <li key={poke.id}>
      <div className="poke-main">
        <Checkbox pokemonID={poke.id}/>
        <img src={poke.sprites ?? "https://placehold.co/96" /*Esto es un problema de la api, algunos pokemon no oficiales no cuentan con sprites*/} alt={poke.id} />
        <div className="poke-info">
          <h2>{poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}</h2>
        </div>
      </div>
      <div className="poke-actions">
        <NavLink to={`/chat/${poke.id}`}>
          <button className="chat">Conversar</button>
        </NavLink>
      </div>
    </li>
  ))
}

export default PokemonList