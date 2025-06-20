import { useEffect, useState } from "react";
import { askGemini } from "./API/Gemini";
import { getPokemonPrompt } from "./API/Pokemon"; // Ajusta ruta si es diferente

const DEFAULT_ID = 1; // Puedes cambiar esto o pasarlo como prop

function App({ id = DEFAULT_ID }) {
  const [input, setInput] = useState("");
  const [messageHistory, setMessageHistory] = useState([]);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  // Prompt inicial al montar el componente
  useEffect(() => {
    const loadInitialPrompt = async () => {
      try {
        const prompt = await getPokemonPrompt(id);
        const initialMessage = { sender: "user", text: prompt };
        const historyWithPrompt = [initialMessage];

        setMessageHistory(historyWithPrompt);
        setLoading(true);

        const reply = await askGemini(historyWithPrompt);
        const assistantMessage = { sender: "assistant", text: reply };
        setMessageHistory([...historyWithPrompt, assistantMessage]);
        setResponse(reply);
        setLoading(false);
      } catch (error) {
        console.error("Error cargando el prompt inicial:", error);
        setResponse("No se pudo cargar el mensaje inicial.");
      }
    };

    loadInitialPrompt();
  }, [id]);

  // Envío manual de mensajes del usuario
  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage = { sender: "user", text: input };
    const updatedHistory = [...messageHistory, newMessage];

    setMessageHistory(updatedHistory);
    setInput("");
    setLoading(true);

    try {
      const reply = await askGemini(updatedHistory);
      const assistantMessage = { sender: "assistant", text: reply };
      setMessageHistory([...updatedHistory, assistantMessage]);
      setResponse(reply);
    } catch (err) {
      setResponse("Error al obtener respuesta.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto", fontFamily: "Arial" }}>
      <h2>Asistente Gemini - Pokémon</h2>

      <div style={{ marginBottom: "1rem" }}>
        <textarea
          rows={4}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu mensaje aquí..."
          style={{ width: "100%", padding: "0.5rem" }}
        />
      </div>

      <button onClick={handleSend} disabled={loading}>
        {loading ? "Enviando..." : "Enviar"}
      </button>

      <div style={{ marginTop: "2rem", whiteSpace: "pre-wrap" }}>
        <h3>Respuesta:</h3>
        <p>{response}</p>
      </div>
    </div>
  );
}

export default App;
