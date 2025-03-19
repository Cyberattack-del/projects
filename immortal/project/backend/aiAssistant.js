require("dotenv").config();
const { OpenAI } = require("openai");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

exports.getAIResponse = async (text) => {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                { role: "system", content: "You are a weather assistant" },
                { role: "user", content: text }
            ]
        });

        return response.choices[0].message.content;
    } catch (error) {
        console.error("Error in AI response:", error);
        return "Sorry, I couldn't process the request.";
    }
};