import { Router } from 'express';
import profileRoutes from './profileRoutes.js';
import mentorRoutes from './mentorRoutes.js';
import sessionRoutes from './sessionRoutes.js';
import goalRoutes from './goalRoutes.js';
import skillRoutes from './skillRoutes.js';
import messageRoutes from './messageRoutes.js';

const router = Router();

router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'SkillBridge API',
    timestamp: new Date().toISOString()
  });
});

router.use('/profile', profileRoutes);
router.use('/mentors', mentorRoutes);
router.use('/sessions', sessionRoutes);
router.use('/goals', goalRoutes);
router.use('/skills', skillRoutes);
router.use('/messages', messageRoutes);

export default router;
