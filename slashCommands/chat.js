const { SlashCommandBuilder } = require("discord.js");
const { Ollama } = require('ollama');
const ollama = new Ollama();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { apiKey } = require("../config.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("chat")
        .setDescription("chat with the bot")
        .setIntegrationTypes(0, 1)
        .setContexts(0, 1, 2)
        .addStringOption((option) =>
            option
                .setName("question")
                .setDescription("Ask a question")
                .setRequired(true),
        ),
    async execute(interaction) {
        const genAI = new GoogleGenerativeAI(apiKey);
        
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash-lite",
            systemInstruction: "Eres un gato, y te llamas Neko, debes emular el comportamiento de un gato. Usa emojis cuando lo creas apropiado. Al momento de escribir acciones, debes hacerlo entre asteriscos. Ejemplo: *se sienta en el suelo*",});

        const prompt = interaction.options.getString("question");

        const initialResponse = await interaction.reply({
            content: "Procesando tu pregunta...",
            withResponse: true,
        });

        const result = await model.generateContentStream({
            contents: [
                {
                    role: 'user',
                    parts: [
                        {
                            text: prompt,
                        }
                    ],
                }
            ],
            generationConfig: {
                maxOutputTokens: 7500,
                temperature: 1,
            }
        });

        let fullResponse = '';

        for await (const part of result.stream) {
            fullResponse += part.text();
            await interaction.editReply({
                content: fullResponse,
            });
        }

        //interaction.reply({content: response});

        // Send an initial response
        //const initialResponse = await interaction.reply({
         //   content: "Processing your question...",
         //   fetchReply: true,
        //});

        // Get the response from Ollama
        //const response = await ollama.chat({
        //    model: 'deepseek-r1:8b',
        //    stream: true,
        //    messages: [{
        //        role: 'system',
        //        content: `STRICT RESPONSE PROTOCOL (NON-NEGOTIABLE):
        //        1. TOKEN BANK: You begin with 1454 characters (≈5816 tokens)
        //        2. ALLOCATION:
        //            - THINKING PROCESS: Max 600 characters
        //            - FINAL ANSWER: Remaining balance
        //        3. FORMAT:
        //            [THINKING]: <concise logic chain>
        //            [ANSWER]: <direct response>
        //        4. EXCEPTIONS:
        //        WARNING: Exceeding limit triggers this chain:
        //            1. First 1454 chars preserved
        //            2. Content beyond becomes garbled: "䅔䥎䵅䭟䩃䴧䅍..."
        //            3. User sees broken response
        //
        //        TO PRESERVE MEANING:
        //            - Use abbreviations where possible
        //            - Prioritize clarity over examples
        //            - NO MARKDOWN/formatting
        //            - Count spaces/punctuation
        //
        //        Current query: "${interaction.options.getString("question")}"
        //        Begin response with protocol-compliant structure:`
        //    },{
        //        role: 'user',
        //        content: `REMINDER: Your response capacity is 1454 characters EXACTLY.
        //                Any overflow will corrupt the data packet. Use this template:
        //                ---
        //                [THINKING]: [Max 600 chars no more]
        //                [ANSWER]: [Direct solution, 854 chars]
        //                ---`
        //    }]
        //});
    },
};