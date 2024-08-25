import express, { Request, Response, Router } from 'express';
import { v4 } from 'uuid';

export function getRouter(): Router {
    const router = express.Router();

    router.get('/uuid', (_req, res) => {
        const uuid = v4();

        res.json({uuid});
    });

    router.post('/gpt_message', (req, res) => {

        res.json({answer: "Hello. I'm GPT"})
    });

    return router;
}