import { GoogleGenAI, Type } from "@google/genai";
import { OutputType } from '../types';

const systemInstruction = "You are an expert social media manager specializing in crafting viral tweets and threads for tech creators on X (formerly Twitter). Your tone is engaging, insightful, and slightly informal. You use emojis and hashtags effectively to maximize reach and engagement. You understand how to create strong hooks and clear calls-to-action. Never include the user's topic in quotes in your response. You must reply with a valid JSON object and nothing else.";

const callGenerativeModel = async (userPrompt: string, responseSchema: any): Promise<any> => {
    // FIX: Per @google/genai guidelines, the API key must be from process.env.API_KEY
    // and passed directly to the GoogleGenAI constructor.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: userPrompt,
        config: {
            systemInstruction: systemInstruction,
            responseMimeType: "application/json",
            responseSchema: responseSchema,
            temperature: 0.7,
        }
    });

    const content = response.text;
    if (!content) {
        throw new Error("Received an empty response from the AI.");
    }
    try {
        return JSON.parse(content);
    } catch (e) {
        console.error("Failed to parse JSON response from AI:", content);
        throw new Error("The AI returned an invalid response format.");
    }
};

const generateSingleTweet = async (topic: string): Promise<string[]> => {
    const userPrompt = `Generate a single, highly engaging tweet about the following topic: "${topic}".`;
    const responseSchema = {
        type: Type.OBJECT,
        properties: {
            tweet: { type: Type.STRING, description: "The generated tweet content." },
        },
        required: ["tweet"],
    };
    const jsonResponse = await callGenerativeModel(userPrompt, responseSchema);
    if (!jsonResponse.tweet || typeof jsonResponse.tweet !== 'string') {
        throw new Error("AI response did not contain a valid 'tweet' field.");
    }
    return [jsonResponse.tweet];
};

const generateThread = async (topic: string): Promise<string[]> => {
    const userPrompt = `Generate a compelling and informative Twitter thread (3-4 tweets) about the following topic: "${topic}". The first tweet must be a strong hook. The middle tweets should provide value. The last tweet should have a call-to-action.`;
    const responseSchema = {
        type: Type.OBJECT,
        properties: {
            thread: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "An array of strings, where each string is a tweet in the thread."
            },
        },
        required: ["thread"],
    };
    const jsonResponse = await callGenerativeModel(userPrompt, responseSchema);
     if (!Array.isArray(jsonResponse.thread)) {
        throw new Error("AI response did not contain a valid 'thread' array.");
    }
    return jsonResponse.thread;
};

const generateVariations = async (topic: string): Promise<string[]> => {
    const userPrompt = `Generate 3 distinct variations of a viral tweet about the following topic: "${topic}". Each variation should have a different angle or tone (e.g., one questioning, one bold statement, one short and punchy).`;
    const responseSchema = {
        type: Type.OBJECT,
        properties: {
            variations: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "An array of 3 distinct tweet variations."
            },
        },
        required: ["variations"],
    };
    const jsonResponse = await callGenerativeModel(userPrompt, responseSchema);
    if (!Array.isArray(jsonResponse.variations)) {
        throw new Error("AI response did not contain a valid 'variations' array.");
    }
    return jsonResponse.variations;
};


/**
 * Generates tweet content using the Gemini API.
 */
export const generateTweetContent = async (topic: string, outputType: OutputType): Promise<string[]> => {
    switch (outputType) {
        case OutputType.Single:
            return generateSingleTweet(topic);
        case OutputType.Thread:
            return generateThread(topic);
        case OutputType.Variations:
            return generateVariations(topic);
        default:
            // This case should ideally not be reached if the UI is correctly implemented
            throw new Error("Invalid output type provided.");
    }
};
