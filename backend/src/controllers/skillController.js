import { store } from '../data/store.js';

export const getSkills = (req, res, next) => {
  try {
    const skills = store.getSkills();
    res.json({ success: true, count: skills.length, data: skills });
  } catch (err) {
    next(err);
  }
};

export const toggleSkillLearn = (req, res, next) => {
  try {
    const { category, skillName } = req.body;
    if (!category || !skillName) {
      return res.status(400).json({ success: false, error: 'Category and skillName are required' });
    }

    const updated = store.toggleSkillLearn(category, skillName);
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Skill or category not found' });
    }

    res.json({
      success: true,
      message: `Skill "${skillName}" ${updated.inLearningList ? 'added to' : 'removed from'} your learning list`,
      data: updated
    });
  } catch (err) {
    next(err);
  }
};

export const toggleSkillMentor = (req, res, next) => {
  try {
    const { category, skillName } = req.body;
    if (!category || !skillName) {
      return res.status(400).json({ success: false, error: 'Category and skillName are required' });
    }

    const updated = store.toggleSkillMentor(category, skillName);
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Skill or category not found' });
    }

    res.json({
      success: true,
      message: `Skill "${skillName}" ${updated.canMentor ? 'marked as volunteering' : 'removed from volunteer list'}`,
      data: updated
    });
  } catch (err) {
    next(err);
  }
};

