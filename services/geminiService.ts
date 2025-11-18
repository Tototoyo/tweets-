// Fix: Add a triple-slash directive to include Vite's client types, which defines `import.meta.env`.
/// <reference types="vite/client" />

import OpenAI from "openai";
import { OutputType } from '../types';

// This file has been updated to use the OpenAI API instead of Gemini.

const systemInstruction = "You are an expert social media manager specializing in crafting viral tweets and threads for tech creators on X (formerly Twitter). Your tone is engaging, insightful, and slightly informal. You use emojis and hashtags effectively to maximize reach and engagement. You understand how to create strong hooks and clear calls-to-action. Never include the user's topic in quotes in your response. You must reply with a valid JSON object and nothing else.";

const callOpenAI = async (userPrompt: string, responseSchema: any): Promise<any> => {
    const openaiApiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (!openaiApiKey) {
        throw new Error("OpenAI API key is not configured. Please set VITE_OPENAI_API_KEY.");
    }

    const openai = new OpenAI({
        apiKey: openaiApiKey,
        dangerouslyAllowBrowser: true // Required for client-side usage
    });

    // The response schema is used to construct a tool for JSON output.
    const tools: OpenAI.Chat.Completions.ChatCompletionTool[] = [
        {
            type: 'function',
            function: {
                name: 'format_response',
                description: 'Formats the output as a JSON object matching the provided schema.',
                parameters: responseSchema,
            },
        },
    ];

    const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini', // A cost-effective and powerful model
        messages: [
            { role: 'system', content: systemInstruction },
            { role: 'user', content: userPrompt }
        ],
        // Use tool_choice to force the model to use our JSON formatting function.
        tools: tools,
        tool_choice: { type: 'function', function: { name: 'format_response' } },
        temperature: 0.7,
    });

    const content = response.choices[0].message.tool_calls?.[0].function.arguments;

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
        type: "object",
        properties: {
            tweet: { type: "string", description: "The generated tweet content." },
        },
        required: ["tweet"],
    };
    const jsonResponse = await callOpenAI(userPrompt, responseSchema);
    if (!jsonResponse.tweet || typeof jsonResponse.tweet !== 'string') {
        throw new Error("AI response did not contain a valid 'tweet' field.");
    }
    return [jsonResponse.tweet];
};

const generateThread = async (topic: string): Promise<string[]> => {
    const userPrompt = `Generate a compelling and informative Twitter thread (3-4 tweets) about the following topic: "${topic}". The first tweet must be a strong hook. The middle tweets should provide value. The last tweet should have a call-to-action.`;
    const responseSchema = {
        type: "object",
        properties: {
            thread: {
                type: "array",
                items: { type: "string" },
                description: "An array of strings, where each string is a tweet in the thread."
            },
        },
        required: ["thread"],
    };
    const jsonResponse = await callOpenAI(userPrompt, responseSchema);
     if (!Array.isArray(jsonResponse.thread)) {
        throw new Error("AI response did not contain a valid 'thread' array.");
    }
    return jsonResponse.thread;
};

const generateVariations = async (topic: string): Promise<string[]> => {
    const userPrompt = `Generate 3 distinct variations of a viral tweet about the following topic: "${topic}". Each variation should have a different angle or tone (e.g., one questioning, one bold statement, one short and punchy).`;
    const responseSchema = {
        type: "object",
        properties: {
            variations: {
                type: "array",
                items: { type: "string" },
                description: "An array of 3 distinct tweet variations."
            },
        },
        required: ["variations"],
    };
    const jsonResponse = await callOpenAI(userPrompt, responseSchema);
    if (!Array.isArray(jsonResponse.variations)) {
        throw new Error("AI response did not contain a valid 'variations' array.");
    }
    return jsonResponse.variations;
};


/**
 * Generates tweet content using the OpenAI API.
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
