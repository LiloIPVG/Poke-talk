import fetchData from "./handleErrors";

const errorMessage = "Lo siento, no pude procesar tu mensaje. Por favor, inténtalo de nuevo más tarde."
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=";
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_KEY

// Este necesita de un historial para preparar al modelo con las preguntas anteriores
// El historial es un array de objetos con la siguiente estructura:
// sender: "user" | "assistant"
// text: "El texto del mensaje"
// luego es renombrado a contents para que el modelo lo entienda, este es el formato que espera Gemini

// askGemini es una función asíncrona que envía un mensaje al modelo Gemini y devuelve la respuesta.
export async function askGemini(messageHistory) {
  const contents = messageHistory.map(msg => ({
    role: msg.sender === "user" ? "user" : "assistant",
    parts: [{ text: msg.text }]
  }));

  const body = {
    contents: contents
  };

  const response = await fetchData(GEMINI_API_URL + GEMINI_API_KEY, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(body)
  });
  
  const reply = response.choices?.[0]?.message?.parts?.[0]?.text || errorMessage;
  return reply;
}