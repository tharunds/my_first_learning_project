import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_FILE = path.join(__dirname, 'db.json');
const INITIAL_DATA_FILE = path.join(__dirname, 'initialData.json');

class Store {
  constructor() {
    this.data = this.loadData();
  }

  loadData() {
    try {
      if (fs.existsSync(DB_FILE)) {
        const fileContent = fs.readFileSync(DB_FILE, 'utf-8');
        return JSON.parse(fileContent);
      }
    } catch (err) {
      console.warn('Could not read existing db.json, falling back to initial data:', err.message);
    }

    try {
      const initialContent = fs.readFileSync(INITIAL_DATA_FILE, 'utf-8');
      const parsed = JSON.parse(initialContent);
      this.saveToFile(parsed);
      return parsed;
    } catch (err) {
      console.error('Failed to load initialData.json:', err.message);
      return {
        userProfile: {},
        mentors: [],
        upcomingSessions: [],
        pastSessions: [],
        learningGoals: [],
        skillsCatalog: [],
        badges: [],
        messages: {}
      };
    }
  }

  saveToFile(dataToSave = this.data) {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(dataToSave, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to save to db.json:', err.message);
    }
  }

  // --- Profile methods ---
  getUserProfile() {
    return this.data.userProfile;
  }

  updateUserProfile(updates) {
    this.data.userProfile = {
      ...this.data.userProfile,
      ...updates
    };
    this.saveToFile();
    return this.data.userProfile;
  }

  toggleVolunteerMode() {
    this.data.userProfile.isVolunteerMentor = !this.data.userProfile.isVolunteerMentor;
    this.saveToFile();
    return this.data.userProfile;
  }

  // --- Mentor methods ---
  getMentors({ query, category, language, sortBy } = {}) {
    let result = [...this.data.mentors];

    if (query) {
      const q = query.toLowerCase();
      result = result.filter(m => 
        m.name.toLowerCase().includes(q) ||
        m.role.toLowerCase().includes(q) ||
        m.company.toLowerCase().includes(q) ||
        m.bio.toLowerCase().includes(q) ||
        m.skills.some(s => s.toLowerCase().includes(q))
      );
    }

    if (category && category !== 'All') {
      const c = category.toLowerCase();
      result = result.filter(m => 
        m.categories.some(cat => cat.toLowerCase().includes(c)) ||
        m.skills.some(skill => skill.toLowerCase().includes(c))
      );
    }

    if (language && language !== 'All') {
      result = result.filter(m => m.languages.includes(language));
    }

    if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'sessions') {
      result.sort((a, b) => b.sessionsCount - a.sessionsCount);
    }

    return result;
  }

  getMentorById(id) {
    return this.data.mentors.find(m => m.id === id) || null;
  }

  // --- Sessions methods ---
  getUpcomingSessions() {
    return this.data.upcomingSessions;
  }

  getPastSessions() {
    return this.data.pastSessions;
  }

  bookSession(sessionData) {
    const newSession = {
      id: sessionData.id || `sess-${Date.now()}`,
      mentorId: sessionData.mentorId,
      mentorName: sessionData.mentorName,
      mentorAvatar: sessionData.mentorAvatar,
      mentorRole: sessionData.mentorRole,
      topic: sessionData.topic || 'General 1-on-1 Mentorship',
      date: sessionData.date || 'Upcoming',
      time: sessionData.time || '6:00 PM IST',
      status: 'Confirmed',
      sessionType: sessionData.sessionType || '1-on-1 Mentorship',
      meetLink: sessionData.meetLink || 'https://meet.google.com/sb-volunteer-session',
      prepNotes: sessionData.prepNotes || 'Session agenda prepared'
    };

    this.data.upcomingSessions.unshift(newSession);
    this.saveToFile();
    return newSession;
  }

  cancelSession(id) {
    const initialLength = this.data.upcomingSessions.length;
    this.data.upcomingSessions = this.data.upcomingSessions.filter(s => s.id !== id);
    if (this.data.upcomingSessions.length !== initialLength) {
      this.saveToFile();
      return true;
    }
    return false;
  }

  // --- Goals methods ---
  getGoals() {
    return this.data.learningGoals;
  }

  addGoal(goalData) {
    const newGoal = {
      id: goalData.id || `goal-${Date.now()}`,
      title: goalData.title,
      domain: goalData.domain || 'General',
      progress: 0,
      dueDate: goalData.dueDate || 'Flexible',
      mentor: goalData.mentor || 'Find a Mentor',
      milestones: goalData.milestones && goalData.milestones.length > 0 
        ? goalData.milestones 
        : [
            { id: 1, text: 'Review fundamentals & resources', done: false },
            { id: 2, text: 'Implement project demonstration', done: false }
          ]
    };

    this.data.learningGoals.unshift(newGoal);
    this.saveToFile();
    return newGoal;
  }

  toggleMilestone(goalId, milestoneId) {
    const goal = this.data.learningGoals.find(g => g.id === goalId);
    if (!goal) return null;

    goal.milestones = goal.milestones.map(m => {
      if (m.id === Number(milestoneId) || m.id === milestoneId) {
        return { ...m, done: !m.done };
      }
      return m;
    });

    const completed = goal.milestones.filter(m => m.done).length;
    goal.progress = Math.round((completed / goal.milestones.length) * 100);

    this.saveToFile();
    return goal;
  }

  deleteGoal(goalId) {
    const initialLength = this.data.learningGoals.length;
    this.data.learningGoals = this.data.learningGoals.filter(g => g.id !== goalId);
    if (this.data.learningGoals.length !== initialLength) {
      this.saveToFile();
      return true;
    }
    return false;
  }

  // --- Skills methods ---
  getSkills() {
    return this.data.skillsCatalog;
  }

  toggleSkillLearn(categoryName, skillName) {
    const category = this.data.skillsCatalog.find(c => c.category.toLowerCase() === categoryName.toLowerCase());
    if (!category) return null;

    const skill = category.skills.find(s => s.name.toLowerCase() === skillName.toLowerCase());
    if (!skill) return null;

    skill.inLearningList = !skill.inLearningList;
    this.saveToFile();
    return skill;
  }

  toggleSkillMentor(categoryName, skillName) {
    const category = this.data.skillsCatalog.find(c => c.category.toLowerCase() === categoryName.toLowerCase());
    if (!category) return null;

    const skill = category.skills.find(s => s.name.toLowerCase() === skillName.toLowerCase());
    if (!skill) return null;

    skill.canMentor = !skill.canMentor;
    this.saveToFile();
    return skill;
  }

  // --- Badges methods ---
  getBadges() {
    return this.data.badges;
  }

  // --- Messages methods ---
  getMessages(mentorId) {
    return this.data.messages[mentorId] || [];
  }

  addMessage(mentorId, message) {
    if (!this.data.messages[mentorId]) {
      this.data.messages[mentorId] = [];
    }

    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: message.sender || 'You',
      time: message.time || 'Just now',
      text: message.text
    };

    this.data.messages[mentorId].push(newMsg);
    this.saveToFile();
    return newMsg;
  }
}

export const store = new Store();

