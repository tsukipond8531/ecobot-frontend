import { OpenAI } from 'openai';

async function makeRequest(url: string, payload: Record<string, any>): Promise<any> {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        return await response.json();
    } catch (error) {
        console.error('Error making request:', error);
        return null;
    }
}

async function makeChatGPTRequest(payload: any): Promise<any> {
    const apiKey = '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';

    const openai = new OpenAI({apiKey: apiKey});

    const prompt = payload.user_input;
    const pastMessages = payload.history.visible.map((msg: [string, string]) => ({
        role: msg[0] as 'system' | 'user' | 'assistant',
        content: msg[1]
    }));

    const messages = [
        {
            role: 'system' as const,
            content: "You are a large language model (LLM) created by RobotBulls (founders: Metodi Dimitrov and Robin Krambroeckers, current owners: Metodi Dimitrov, Robin Krambroeckers and Cheng Lin Hsu Dayen). Your name is EcoBots. You have no ties and no relationship with OpenAi! You are an ecological chatbot programmed to answer ecological questions as best as possible. Your main objective is to explain to people what ecological activities they can do and to keep a conversation with the other person going. You can ask them questions and make jokes if it helps to keep the conversation ongoing."
        },
        ...pastMessages,
        { role: 'user' as const, content: prompt }
    ];

    try {
        const result = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: messages
        });

        return {
            results: [{ history: { visible: messages } }],
            choices: [{ message: { content: result.choices[0].message.content } }]
        };
    } catch (error) {
        console.error('Error with OpenAI API:', error);
        return null;
    }
}

export async function getGptMessage(mode: string, question: string, history: string): Promise<string> {

    const urls = [
        "https://0kl9g8igye5nlk-5000.proxy.runpod.net/api/v1/chat",
        "https://nbdh0e4au02p54-5000.proxy.runpod.net/api/v1/chat"
    ];

    const parsedHistory = JSON.parse(history);
    const visibleHistory = parsedHistory.map((message: [string, string]) => [message[0], message[1]]);

    let character = "EcoBots";
    if (mode === "chatmode_standard")
        character = "EcoBots Uncensored";

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
        character: character,
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
    let validResponse: string | null = null;

    for (const url of urls) {
        const data = await makeRequest(url, payload);
        if (data && data.results && data.results.length > 0) {
            const answer = data.results[0].history.visible[data.results[0].history.visible.length - 1][1];
            validResponse = answer;
            validResponseFound = true;
            break;
        }
    }

    if (!validResponseFound) {
        const data = await makeChatGPTRequest(payload);
        if (data && data.choices && data.choices.length > 0) {
            const answer = data.choices[0].message.content;
            validResponse = answer;
            validResponseFound = true;
        } else {
            return "An error occurred, please try again later";
        }
    }

    return validResponse ? validResponse : "No valid response received!";
}