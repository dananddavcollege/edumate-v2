import { GoogleGenAI } from "@google/genai";
export class GeminiService {
  private static instance: GeminiService;
  private ai: GoogleGenAI;
  private constructor() {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    this.ai = new GoogleGenAI({ apiKey: apiKey || "" });
  }
  public static getInstance(): GeminiService {
    if (!GeminiService.instance) GeminiService.instance = new GeminiService();
    return GeminiService.instance;
  }
  public async chat(msg: string) {
    const res = await this.ai.models.generateContent({ model: 'gemini-3-flash-preview', contents: [{ role: 'user', parts: [{ text: msg }] }] });
    return res.text;
  }
}
