
import { GoogleGenAI } from "@google/genai";

export interface FlightResult {
  airline: string;
  origin: string;
  price: string;
  duration: string;
  link: string;
}

/**
 * Service to fetch flight information using Google Search grounding.
 */
export const getFlightInformation = async (origin: string): Promise<{ text: string, sources: any[] }> => {
  // Initialize right before call to ensure API_KEY is available in context
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Search for current flight prices, routes, and airline options from ${origin} to Addis Ababa (ADD), Ethiopia. Include estimated prices in both USD and local currency if applicable. List specific airlines like Ethiopian Airlines, Emirates, or flydubai.`,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    if (!response || !response.text) {
      throw new Error("Empty response from Gemini");
    }

    return {
      text: response.text,
      sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error) {
    console.error("Gemini flight search error:", error);
    return { 
      text: "We are currently unable to fetch live flight data. Please check directly with carriers like Ethiopian Airlines or Emirates.", 
      sources: [] 
    };
  }
};

/**
 * Service for general travel advice.
 */
export const getTravelAdvisorResponse = async (query: string): Promise<string> => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-pro-preview",
        contents: query,
        config: {
            systemInstruction: "You are an expert travel advisor for Visit.Ethiopiayen. You provide helpful, culturally sensitive, and professional advice about traveling to Ethiopia. Use clear formatting, bullet points, and an encouraging tone."
        }
      });
      return response.text || "I'm sorry, I couldn't process that request at the moment.";
    } catch (error) {
        console.error("Gemini advisor error:", error);
        return "The travel advisor is currently resting. Please try asking your question again in a moment.";
    }
}
