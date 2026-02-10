
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const isOnline = () => navigator.onLine;

export const getMarketAnalysis = async (assetName: string) => {
  if (!isOnline()) {
    return "Modo Offline: No se puede conectar con el Asesor IA. Por favor, revisa tu conexión a internet.";
  }
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Proporciona un análisis breve (máximo 100 palabras) sobre la situación actual de ${assetName} en el mercado cripto. Incluye una recomendación de 'Compra', 'Venta' o 'Mantener' basándote en tendencias hipotéticas. Responde en español.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "No se pudo obtener el análisis en este momento.";
  }
};

export const generateCryptoQuiz = async () => {
  if (!isOnline()) return null;
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: 'Genera una pregunta de opción múltiple sobre criptomonedas y tecnología blockchain. Incluye 4 opciones y la respuesta correcta.',
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            options: { type: Type.ARRAY, items: { type: Type.STRING } },
            correctAnswer: { type: Type.STRING },
            explanation: { type: Type.STRING }
          },
          required: ["question", "options", "correctAnswer", "explanation"]
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Quiz Error:", error);
    return null;
  }
};
