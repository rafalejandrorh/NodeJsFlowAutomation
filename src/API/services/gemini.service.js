const { GoogleGenerativeAI } = require('@google/generative-ai');

const { gemini: { apiKey } } = require('../../../config/');

class GeminiService {

    constructor() {
        //this.apiKey = apiKey;
        this.contentType = 'application/json';
        this.genAI = new GoogleGenerativeAI(apiKey);
    }

    async promptText(prompt) {
        try {

            // Access your API key as an environment variable (see "Set up your API key" above)
            //const genAI = new GoogleGenerativeAI(apiKey);

            // The Gemini 1.5 models are versatile and work with most use cases
            const model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            console.log(text);
            return {
                data: {
                    response: text
                }
            };
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = GeminiService;