import { store } from '../data/store.js';

export const getMentors = (req, res, next) => {
  try {
    const { query, category, language, sortBy } = req.query;
    const mentors = store.getMentors({ query, category, language, sortBy });
    res.json({
      success: true,
      count: mentors.length,
      data: mentors
    });
  } catch (err) {
    next(err);
  }
};

export const getMentorById = (req, res, next) => {
  try {
    const { id } = req.params;
    const mentor = store.getMentorById(id);
    if (!mentor) {
      return res.status(404).json({ success: false, error: `Mentor with id ${id} not found` });
    }
    res.json({ success: true, data: mentor });
  } catch (err) {
    next(err);
  }
};

