import { store } from '../data/store.js';

export const getProfile = (req, res, next) => {
  try {
    const profile = store.getUserProfile();
    res.json({ success: true, data: profile });
  } catch (err) {
    next(err);
  }
};

export const updateProfile = (req, res, next) => {
  try {
    const updates = req.body;
    if (!updates || Object.keys(updates).length === 0) {
      return res.status(400).json({ success: false, error: 'No update payload provided' });
    }
    const updated = store.updateUserProfile(updates);
    res.json({ success: true, data: updated, message: 'Profile updated successfully' });
  } catch (err) {
    next(err);
  }
};

export const toggleVolunteer = (req, res, next) => {
  try {
    const updated = store.toggleVolunteerMode();
    res.json({ 
      success: true, 
      data: updated, 
      message: `Volunteer mode ${updated.isVolunteerMentor ? 'activated' : 'deactivated'}` 
    });
  } catch (err) {
    next(err);
  }
};
