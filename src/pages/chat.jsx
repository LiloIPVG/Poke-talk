import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getPokemonPrompt } from '../API/Pokemon';
import { askGemini } from '../API/Gemini.js';


export default function Chat(){
    const params = useParams();
    const pokemonID = params.pokemonID;
    const [prompt, setPrompt] = useState("");
    const [messageHistory, setMessageHistory] = useState([]);
    const [userInput, setUserInput] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchPrompt() {
            const p = await getPokemonPrompt(pokemonID);
            setPrompt(p);
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
        <div>
            {messageHistory.map((message, index) => (
                <div key={index} className={`message ${message.sender}`}>
                    <p>{message.text}</p>
                </div>
            ))}
            <div>
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
            </div>
        </div>
    )
}