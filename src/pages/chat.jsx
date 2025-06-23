import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getPokemonPrompt, getPokemonInfo } from '../API/Pokemon';
import { askGemini } from '../API/Gemini.js';
import { NavLink } from 'react-router';
import './chat.css';

export default function Chat(){
    const params = useParams();
    const pokemonID = params.pokemonID;
    const [pokemonInfo, setPokemonInfo] = useState([])
    const [prompt, setPrompt] = useState("");
    const [messageHistory, setMessageHistory] = useState([]);
    const [userInput, setUserInput] = useState("");
    const [loading, setLoading] = useState(false);

useEffect(() => {
  async function fetchPrompt() {
    try {
      const [promptData, infoData] = await Promise.all([
        getPokemonPrompt(pokemonID),
        getPokemonInfo("https://pokeapi.co/api/v2/pokemon/" + pokemonID)
      ]);

      setPrompt(promptData);
      setPokemonInfo(infoData);
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
    }
  }

  if (pokemonID) fetchPrompt();
}, [pokemonID]);

    async function handleSend() {
        if (!userInput.trim()) return;
        setLoading(true);
        const newHistory = [...messageHistory, {sender: 'user', text: userInput}];
        setMessageHistory(newHistory);
        const historyForModel = prompt ? [{sender: 'model', text: prompt}, ...newHistory] : newHistory;
        const response = await askGemini(historyForModel);
        setMessageHistory([...newHistory, {sender: 'model', text: response}]);
        setUserInput("");
        setLoading(false);
        
    }

    if (!pokemonID) {
        return <p>Cargando información del Pokémon...</p>
    }

    return(
        <>
            <nav id='navbar'>
                <NavLink to={"../../"}>
                    <button>Volver</button>
                </NavLink>
                <h2>
                {pokemonInfo.name ? pokemonInfo.name.charAt(0).toUpperCase() + pokemonInfo.name.slice(1) : ""}
                </h2>
            </nav>
            <main>
                <section id='chat'>
                    {messageHistory.map((message, index) => (
                        <div key={index} className={`message-box message-${message.sender}`}>
                            <p>{message.text}</p>
                        </div>
                    ))}
                </section>
            </main>

            <footer id="input">
                <input 
                    type="text" 
                    placeholder="Escribe tu mensaje..." 
                    value={userInput}
                    onChange={e => setUserInput(e.target.value)}
                    disabled={loading}
                />
                <button onClick={handleSend}>
                    Enviar
                </button>
            </footer>
        </>
    )
}