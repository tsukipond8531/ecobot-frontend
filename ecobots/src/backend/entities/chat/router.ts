import express, { Request, Response, Router } from 'express';
import { v4 } from 'uuid';
import { getGptMessage } from './gptservice';
import ChatService from './chatservice';

import { AuthenticatedRequest } from '../../types';
import auth from '../../middlewares/auth';

export function getRouter(): Router {
    const router = express.Router();

    router.get('/uuid', (_req, res) => {
        const uuid = v4();

        res.json({uuid});
    });

    router.post('/gpt_message', async (req, res) => {
        const mode = req.query.mode as string;
        const question = req.query.question as string;
        const history = req.query.history as string;
    
        // Provide default values or handle undefined cases
        if (!mode || !question || !history) {
            return res.status(400).json({ error: "Missing required query parameters." });
        }
    
        try {
            const answer = getGptMessage(mode, question, history);
            res.json({ answer });
        } catch (error) {
            res.status(500).json({ error: "Error processing GPT message." });
        }
    });

    router.post('/save_message', auth(), async (req: AuthenticatedRequest, res) => {
        const device_uuid = req.device_uuid as string;
        const chatid = req.query.chatid as string;
        const messages = req.query.messages as string[];

        // Provide default values or handle undefined cases
        if (!device_uuid || !chatid || !messages) {
            return res.status(400).json({ error: "Missing required query parameters." });
        }

        try {
            const ret = await ChatService.saveMessage(device_uuid, chatid, messages);
            res.json({ret});
        } catch (error) {
            res.status(500).json({ error: "Error save message" });
        }
    });

    router.post('/set_message_rate', auth(), async (req: AuthenticatedRequest, res) => {
        const device_uuid = req.device_uuid as string;
        const chatid = req.query.chatid as string;
        const rate = req.query.rate as string;

        // Provide default values or handle undefined cases
        if (!device_uuid || !chatid || !rate) {
            return res.status(400).json({ error: "Missing required query parameters." });
        }

        try {
            const ret = await ChatService.setMessageRate(device_uuid, chatid, rate);
            res.json({ret});
        } catch (error) {
            res.status(500).json({ error: "Error set rate message" });
        }
    });


    return router;
}