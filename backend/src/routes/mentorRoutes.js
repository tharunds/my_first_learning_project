import { Router } from 'express';
import { getMentors, getMentorById } from '../controllers/mentorController.js';

const router = Router();

router.get('/', getMentors);
router.get('/:id', getMentorById);

export default router;

