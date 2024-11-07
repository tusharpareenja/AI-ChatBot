import { GoogleGenerativeAI } from "@google/generative-ai";

// Use Vite's `import.meta.env` to access environment variables
const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

if (!apiKey) {
    console.error("API key is not defined! Please check your .env file.");
}

const genAI = new GoogleGenerativeAI(apiKey);

export const getGenerativeModel = () => {
    return genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
};

export default genAI;
