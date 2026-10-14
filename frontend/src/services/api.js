const BASE_URL = '/api';

/**
 * Helper to make HTTP requests with JSON parsing and fallback error handling
 */
async function request(endpoint, options = {}) {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.warn(`[API] Request to ${endpoint} failed:`, err.message);
    throw err;
  }
}

export const api = {
  // --- Profile ---
  async getProfile() {
    return request('/profile');
  },

  async updateProfile(updates) {
    return request('/profile', {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
  },

  async toggleVolunteer() {
    return request('/profile/toggle-volunteer', {
      method: 'POST'
    });
  },

  // --- Mentors ---
  async getMentors(params = {}) {
    const query = new URLSearchParams();
    if (params.query) query.append('query', params.query);
    if (params.category) query.append('category', params.category);
    if (params.language) query.append('language', params.language);
    if (params.sortBy) query.append('sortBy', params.sortBy);
    
    const qs = query.toString();
    return request(`/mentors${qs ? `?${qs}` : ''}`);
  },

  async getMentorById(id) {
    return request(`/mentors/${id}`);
  },

  // --- Sessions ---
  async getUpcomingSessions() {
    return request('/sessions/upcoming');
  },

  async getPastSessions() {
    return request('/sessions/past');
  },

  async bookSession(sessionData) {
    return request('/sessions/book', {
      method: 'POST',
      body: JSON.stringify(sessionData)
    });
  },

  async cancelSession(id) {
    return request(`/sessions/${id}`, {
      method: 'DELETE'
    });
  },

  // --- Goals ---
  async getGoals() {
    return request('/goals');
  },

  async createGoal(goalData) {
    return request('/goals', {
      method: 'POST',
      body: JSON.stringify(goalData)
    });
  },

  async toggleMilestone(goalId, milestoneId) {
    return request(`/goals/${goalId}/milestones/${milestoneId}`, {
      method: 'PATCH'
    });
  },

  async deleteGoal(id) {
    return request(`/goals/${id}`, {
      method: 'DELETE'
    });
  },

  async getBadges() {
    return request('/goals/badges');
  },

  // --- Skills ---
  async getSkills() {
    return request('/skills');
  },

  async toggleSkillLearn(category, skillName) {
    return request('/skills/toggle-learn', {
      method: 'POST',
      body: JSON.stringify({ category, skillName })
    });
  },

  async toggleSkillMentor(category, skillName) {
    return request('/skills/toggle-mentor', {
      method: 'POST',
      body: JSON.stringify({ category, skillName })
    });
  },

  // --- Messages ---
  async getMessages(mentorId) {
    return request(`/messages/${mentorId}`);
  },

  async sendMessage(mentorId, messageData) {
    return request(`/messages/${mentorId}`, {
      method: 'POST',
      body: JSON.stringify(messageData)
    });
  }
};

