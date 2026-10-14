import { Router } from 'express';
import { 
  getSkills, 
  toggleSkillLearn, 
  toggleSkillMentor 
} from '../controllers/skillController.js';

const router = Router();

router.get('/', getSkills);
router.post('/toggle-learn', toggleSkillLearn);
router.post('/toggle-mentor', toggleSkillMentor);

export default router;
