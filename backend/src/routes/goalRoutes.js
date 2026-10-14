import { Router } from 'express';
import { 
  getGoals, 
  createGoal, 
  toggleMilestone, 
  deleteGoal, 
  getBadges 
} from '../controllers/goalController.js';

const router = Router();

router.get('/', getGoals);
router.post('/', createGoal);
router.patch('/:goalId/milestones/:milestoneId', toggleMilestone);
router.delete('/:id', deleteGoal);
router.get('/badges', getBadges);

export default router;

