import { Router } from 'express';

import { fetchUUID, fetchGptMessage } from '../controller';

const router = Router();

router.get('/uuid', fetchUUID);
router.get('/gpt_message', fetchGptMessage);

export default router;