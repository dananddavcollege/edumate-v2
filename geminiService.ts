import { GoogleGenAI, Type } from "@google/genai";

export class GeminiService {
  private static instance: GeminiService;
  private ai: GoogleGenAI;

  private constructor() {
    // We use import.meta.env for Vercel/Vite compatibility
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      console.error("API Key missing! Add VITE_GEMINI_API_KEY to Vercel Environment Variables.");
    }
    this.ai = new GoogleGenAI({ apiKey: apiKey || "" });
  }

  public static getInstance(): GeminiService {
    if (!GeminiService.instance) {
      GeminiService.instance = new GeminiService();
    }
    return GeminiService.instance;
  }

  public async chat(message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[] = []) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [...history, { role: 'user', parts: [{ text: message }] }],
        config: {
          systemInstruction: "You are EduMate AI, a friendly and helpful tutor. Keep your answers educational, concise, and encouraging.",
          temperature: 0.7,
        }
      });
      return response.text;
    } catch (error) {
      console.error("Gemini Error:", error);
      return "I'm having a bit of trouble connecting to my brain right now.";
    }
  }

  public async generateSummary(topic: string) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Generate a comprehensive study note/summary for the topic: "${topic}". Use markdown headers, bullet points, and highlight key terms.`,
        config: {
          systemInstruction: "You are an expert educator. Create structured, clear, and high-quality educational notes.",
        }
      });
      return response.text;
    } catch (error) {
      console.error("Summary Error:", error);
      return null;
    }
  }

  public async generateQuiz(topic: string) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Create a 5-question multiple choice quiz about "${topic}".`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                question: { type: Type.STRING },
                options: { type: Type.ARRAY, items: { type: Type.STRING } },
                correctAnswer: { type: Type.INTEGER },
                explanation: { type: Type.STRING }
              },
              required: ["question", "options", "correctAnswer", "explanation"]
            }
          }
        }
      });
      return JSON.parse(response.text || "[]");
    } catch (error) {
      console.error("Quiz Generation Error:", error);
      return null;
    }
  }
}
