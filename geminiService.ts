
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export interface FlightResult {
  airline: string;
  origin: string;
  price: string;
  duration: string;
  link: string;
}

export const getFlightInformation = async (origin: string): Promise<{ text: string, sources: any[] }> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Search for current flight prices and airline options from ${origin} to Addis Ababa, Ethiopia. Provide a summary of prices and top airlines.`,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    return {
      text: response.text || "No flight information found.",
      sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error) {
    console.error("Gemini flight search error:", error);
    return { text: "Error fetching flight data. Please try again later.", sources: [] };
  }
};

export const getTravelAdvisorResponse = async (query: string): Promise<string> => {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: query,
        config: {
            systemInstruction: "You are an expert travel advisor for Visit.Ethiopiayen. You provide helpful, safe, and professional advice about traveling to Ethiopia. Use formatting for readability."
        }
      });
      return response.text || "I'm sorry, I couldn't process that.";
    } catch (error) {
        return "The advisor is currently unavailable.";
    }
}
