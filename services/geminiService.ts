
import { GoogleGenAI } from "@google/genai";

export const generateLovePoem = async (name: string): Promise<string> => {
  // Safe check for process.env to prevent ReferenceErrors
  let apiKey: string | undefined;
  try {
    apiKey = typeof process !== 'undefined' ? process.env.API_KEY : undefined;
  } catch (e) {
    apiKey = undefined;
  }

  const fallback = `Dearest Reader,\n\nThe Ton is in a flutter! Miss ${name} has found her match. \nShe is truly the Diamond of the Season, and her suitor is 'pastry' the point of return. \nHow does one intend to spend her afternoon? Perhaps a promenade? \n\nYours Truly, Lady Whistledown.`;

  if (!apiKey || apiKey === "undefined" || apiKey === "") {
    console.warn("API_KEY not found. Using Lady Whistledown's default announcement.");
    return fallback;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a cheeky Bridgerton-style society announcement for Miss ${name}. 
      Context: She has just accepted a Valentine's proposal from her devoted suitor.
      
      Instructions:
      1. Use Lady Whistledown's tone.
      2. Mention she is the 'Diamond of the Season'.
      3. Include Regency puns (e.g., 'tight corset', 'well-rounded suitor', 'tea-riffic').
      4. Ask her playfully about her plans for a promenade.
      5. Address her as 'Miss ${name}'.`,
      config: {
        temperature: 0.9,
      }
    });
    
    return response.text || fallback;
  } catch (error) {
    console.error("Gemini Error:", error);
    return fallback;
  }
};
