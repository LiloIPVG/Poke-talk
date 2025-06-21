import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getPokemonPrompt } from '../API/Pokemon';
import NotFound from './notFound.jsx';

export default function Chat(){

    const params = useParams();
    const pokemonID = params.pokemonID;
    const [pront, setPront] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const info = await getPokemonPrompt(pokemonID);
            setPront(info);
        }
        fetchData();
    }, [pokemonID]);

    if (pokemonID > 1302) {
        return <NotFound />
    }

    if (!pokemonID) {
        return <p>Cargando información del Pokémon...</p>
    }

    return(
        <p>{pront}</p>
    )
}