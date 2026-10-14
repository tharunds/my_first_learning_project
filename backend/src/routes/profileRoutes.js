import { Router } from 'express';
import { getProfile, updateProfile, toggleVolunteer } from '../controllers/profileController.js';

const router = Router();

router.get('/', getProfile);
router.put('/', updateProfile);
router.post('/toggle-volunteer', toggleVolunteer);

export default router;
