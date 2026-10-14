import { store } from '../data/store.js';

export const getGoals = (req, res, next) => {
  try {
    const goals = store.getGoals();
    res.json({ success: true, count: goals.length, data: goals });
  } catch (err) {
    next(err);
  }
};

export const createGoal = (req, res, next) => {
  try {
    const { title, domain, dueDate, mentor, milestones } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ success: false, error: 'Goal title is required' });
    }

    const newGoal = store.addGoal({ title, domain, dueDate, mentor, milestones });
    res.status(201).json({
      success: true,
      message: 'Learning goal created successfully',
      data: newGoal
    });
  } catch (err) {
    next(err);
  }
};

export const toggleMilestone = (req, res, next) => {
  try {
    const { goalId, milestoneId } = req.params;
    const updatedGoal = store.toggleMilestone(goalId, milestoneId);
    if (!updatedGoal) {
      return res.status(404).json({ success: false, error: 'Goal not found' });
    }

    res.json({
      success: true,
      message: 'Milestone updated',
      data: updatedGoal
    });
  } catch (err) {
    next(err);
  }
};

export const deleteGoal = (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = store.deleteGoal(id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Goal not found' });
    }
    res.json({ success: true, message: 'Goal deleted successfully' });
  } catch (err) {
    next(err);
  }
};

export const getBadges = (req, res, next) => {
  try {
    const badges = store.getBadges();
    res.json({ success: true, data: badges });
  } catch (err) {
    next(err);
  }
};

