
const {
    GoogleGenAI,
} = require('@google/genai');

async function GenerateContent(prompt) {
    const ai = new GoogleGenAI({
        apiKey: 'AIzaSyDTqM8IQU0zYqtrRIDvGi1aVoW1HFgSklg',
    });
    
    const config = {
        responseMimeType: 'text/plain',
    };
    const model = 'gemini-2.5-flash-preview-04-17';
    const contents = [
        {
            role: 'user',
            parts: [
                {
                    text: prompt,
                },
            ],
        },
    ];

    const response = await ai.models.generateContentStream({
        model,
        config,
        contents,
    });
    let fullText = "";

    for await (const chunk of response) {
        if (chunk.text) {
            fullText += chunk.text;
        }
    }

    return fullText;
}

module.exports = {
    GenerateContent,
};
