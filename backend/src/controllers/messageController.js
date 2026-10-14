import { store } from '../data/store.js';

export const getMessages = (req, res, next) => {
  try {
    const { mentorId } = req.params;
    const messages = store.getMessages(mentorId);
    res.json({ success: true, count: messages.length, data: messages });
  } catch (err) {
    next(err);
  }
};

export const sendMessage = (req, res, next) => {
  try {
    const { mentorId } = req.params;
    const { text, sender, time } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ success: false, error: 'Message text cannot be empty' });
    }

    const newMessage = store.addMessage(mentorId, {
      text: text.trim(),
      sender: sender || 'You',
      time: time || 'Just now'
    });

    res.status(201).json({
      success: true,
      message: 'Message sent',
      data: newMessage
    });
  } catch (err) {
    next(err);
  }
};

