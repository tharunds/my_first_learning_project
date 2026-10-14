import { store } from '../data/store.js';

export const getUpcomingSessions = (req, res, next) => {
  try {
    const sessions = store.getUpcomingSessions();
    res.json({ success: true, count: sessions.length, data: sessions });
  } catch (err) {
    next(err);
  }
};

export const getPastSessions = (req, res, next) => {
  try {
    const sessions = store.getPastSessions();
    res.json({ success: true, count: sessions.length, data: sessions });
  } catch (err) {
    next(err);
  }
};

export const bookSession = (req, res, next) => {
  try {
    const { mentorId, mentorName, mentorAvatar, mentorRole, topic, date, time, sessionType, prepNotes } = req.body;

    if (!mentorName) {
      return res.status(400).json({ success: false, error: 'Mentor name is required' });
    }

    const newSession = store.bookSession({
      mentorId,
      mentorName,
      mentorAvatar,
      mentorRole,
      topic,
      date,
      time,
      sessionType,
      prepNotes
    });

    res.status(201).json({
      success: true,
      message: 'Mentorship session booked successfully',
      data: newSession
    });
  } catch (err) {
    next(err);
  }
};

export const cancelSession = (req, res, next) => {
  try {
    const { id } = req.params;
    const removed = store.cancelSession(id);
    if (!removed) {
      return res.status(404).json({ success: false, error: 'Session not found' });
    }
    res.json({ success: true, message: 'Session cancelled successfully' });
  } catch (err) {
    next(err);
  }
};
