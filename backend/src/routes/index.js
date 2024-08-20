import { Router } from 'express';

import auth from '../middlewares/auth'

import { fetchUUID, fetchGptMessage, saveMessage, setMessageRate } from '../controller';

const router = Router();

router.get('/uuid', fetchUUID);
router.post('/gpt_message', auth(), fetchGptMessage);
router.post('/save_message', auth(), saveMessage)
router.post('/set_message_rate', auth(), setMessageRate);

export default router;