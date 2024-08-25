import express, { Request, Response, Router } from 'express';
import { v4 } from 'uuid';
import { getGptMessage } from './gptservice';

export function getRouter(): Router {
    const router = express.Router();

    router.get('/uuid', (_req, res) => {
        const uuid = v4();

        res.json({uuid});
    });

    router.post('/gpt_message', async (req, res) => {
        const mode = req.query.mode as string | undefined;
        const question = req.query.question as string | undefined;
        const history = req.query.history as string | undefined;
    
        // Provide default values or handle undefined cases
        if (!mode || !question || !history) {
            return res.status(400).json({ error: "Missing required query parameters." });
        }
    
        try {
            const answer = await getGptMessage(mode, question, history);
            res.json({ answer });
        } catch (error) {
            res.status(500).json({ error: "Error processing GPT message." });
        }
    });

    return router;
}