import { Router } from 'express';

import { fetchUUID } from '../controller';

const router = Router();

router.get('/uuid', fetchUUID)

export default router;