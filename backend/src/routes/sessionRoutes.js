import { Router } from 'express';
import { 
  getUpcomingSessions, 
  getPastSessions, 
  bookSession, 
  cancelSession 
} from '../controllers/sessionController.js';

const router = Router();

router.get('/upcoming', getUpcomingSessions);
router.get('/past', getPastSessions);
router.post('/book', bookSession);
router.delete('/:id', cancelSession);

export default router;

