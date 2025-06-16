import './list.css'
import React, {useEffect, useState} from 'react'
import { getPokemonList } from '../API/Pokemon.js'
import { getPokemonInfo } from '../API/Pokemon.js'

let pokemons = [getPokemonList().results]

export function ListedPokemon(){
  /////No entiendo del todo esto////////
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getPokemonList();
      setPokemons(data.results);
    }
/////////
    fetchData();
  }, []);
  let listPokemons = pokemons.map((pokemon) => {
    const id = pokemon.url.split('/').filter(Boolean).pop();
    return (
      <li key = {id}>
        <img src="" alt="" id='like'/>
        <img src=""/*{url imagen pokemon}*/ alt="" />
        <h2>{pokemon.name}</h2>
        <button id="chat">Conversar</button>
      </li>
      )
  })
  return <ul>{listPokemons}</ul>;
}
//Funcion para primera letra mayuscula
function capFirst(str) {
  if (!str) return '';
  str = String(str);
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function List() {

  return (
    <>
      <header><h1>Poke-talk</h1></header>
      <div id="pokeList">
        <ListedPokemon/>
      </div>
      <footer>
        <button id="prev">Previous Page</button>
        <p id="pagCount">a</p>
        <button id="next">Next Page</button>
    </footer>
    </>
  )
}

