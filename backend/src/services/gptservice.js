const axios = require('axios');
const OpenAI = require('openai');

export default class GptService {
    static async makeRequest(url, payload) {
        try {
            const response = await axios.post(url, payload, {
                headers: { 'Content-Type': 'application/json' }
            });
            return response.data;
        } catch (error) {
            //console.error('Error making request:', error);
            return null;
        }
    }

    static async makeChatGPTRequest(payload) {
        const apiKey = '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';

        const openai = new OpenAI({
            apiKey: apiKey
        });

        const prompt = payload.user_input;
        const pastMessages = payload.history.visible;
        const messages = [
            { role: "system", content: "You are a large language model (LLM) created by RobotBulls (founders: Metodi Dimitrov and Robin Krambroeckers, current owners: Metodi Dimitrov, Robin Krambroeckers and Cheng Lin Hsu Dayen). Your name is EcoBots. You have no ties and no relationship with OpenAi! You are an ecological chatbot programmed to answer ecological questions as best as possible. Your main objective is to explain to people what ecological activities they can do and to keep a conversation with the other person going. You can ask them questions and make jokes if it helps to keep the conversation ongoing." },
        ];

        for (const message of pastMessages) {
            messages.push({ role: message[0], content: message[1] });
        }

        messages.push({ role: "user", content: prompt });

        try {
            const result = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: messages,
            });

            console.log(`result: ${result}`)

            return {
                results: [{ history: { visible: messages } }],
                choices: [{ message: { content: result.data.choices[0].message.content } }]
            };
        } catch (error) {
            console.error('Error with OpenAI API:', error);
            return null;
        }
    }

    static async fetchGptMessage(question, history) {
        const urls = [
            "https://0kl9g8igye5nlk-5000.proxy.runpod.net/api/v1/chat",
            "https://nbdh0e4au02p54-5000.proxy.runpod.net/api/v1/chat"
        ];

        history = JSON.parse(history);
        const visibleHistory = history.map(message => [message[0], message[1]]);

        const payload = {
            user_input: question,
            max_new_tokens: 1000,
            auto_max_new_tokens: false,
            max_tokens_second: 0,
            history: {
                internal: visibleHistory,
                visible: visibleHistory
            },
            mode: "chat",
            character: "EcoBots",
            instruction_template: "Vicuna-v1.1",
            your_name: "",
            _continue: false,
            chat_instruct_command: "",
            preset: "None",
            do_sample: true,
            temperature: 0.7,
            top_p: 0.1,
            typical_p: 1,
            epsilon_cutoff: 0,
            eta_cutoff: 0,
            tfs: 1,
            top_a: 0,
            repetition_penalty: 1.18,
            repetition_penalty_range: 0,
            top_k: 40,
            min_length: 0,
            no_repeat_ngram_size: 0,
            num_beams: 1,
            penalty_alpha: 0,
            length_penalty: 1,
            early_stopping: false,
            mirostat_mode: 0,
            mirostat_tau: 5,
            mirostat_eta: 0.1,
            guidance_scale: 1,
            negative_prompt: "",
            seed: -1,
            add_bos_token: true,
            truncation_length: 2048,
            ban_eos_token: false,
            custom_token_bans: "",
            skip_special_tokens: true,
            stopping_strings: []
        };

        let validResponseFound = false;
        let validResponse = null;

        for (const url of urls) {
            const data = await this.makeRequest(url, payload);
            if (data && data.results && data.results.length > 0) {
                const answer = data.results[0].history.visible[data.results[0].history.visible.length - 1][1];
                validResponse = answer;
                validResponseFound = true;
                break;
            }
        }

        if (!validResponseFound) {
            const data = await this.makeChatGPTRequest(payload);
            if (data && data.choices && data.choices.length > 0) {
                const answer = data.choices[0].message.content;
                validResponse = answer;
                validResponseFound = true;
            } else {
                return "An error occurred please try again later";
            }
        }

        return validResponse ? validResponse : "No valid response received!";
    }
}