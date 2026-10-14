import { Router } from 'express';
import { getMessages, sendMessage } from '../controllers/messageController.js';

const router = Router();

router.get('/:mentorId', getMessages);
router.post('/:mentorId', sendMessage);

export default router;
