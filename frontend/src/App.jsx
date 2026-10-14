import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ExploreMentors from './components/ExploreMentors';
import MyMentors from './components/MyMentors';
import Progress from './components/Progress';
import Skills from './components/Skills';
import Profile from './components/Profile';
import BookSessionModal from './components/BookSessionModal';
import ChatModal from './components/ChatModal';
import AddGoalModal from './components/AddGoalModal';

import { 
  initialUserProfile, 
  mentorsData, 
  upcomingSessions as initialUpcomingSessions, 
  pastSessions as initialPastSessions, 
  learningGoals as initialLearningGoals, 
  skillsCatalog as initialSkillsCatalog, 
  badgesList as initialBadgesList,
  mockMessages
} from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentRole, setCurrentRole] = useState('learner'); // 'learner' | 'mentor'

  const [userProfile, setUserProfile] = useState(initialUserProfile);
  const [mentors, setMentors] = useState(mentorsData);
  const [upcomingSessions, setUpcomingSessions] = useState(initialUpcomingSessions);
  const [pastSessions, setPastSessions] = useState(initialPastSessions);
  const [learningGoals, setLearningGoals] = useState(initialLearningGoals);
  const [skillsCatalog, setSkillsCatalog] = useState(initialSkillsCatalog);
  const [badges, setBadges] = useState(initialBadgesList);

  // Modals state
  const [selectedBookingMentor, setSelectedBookingMentor] = useState(null);
  const [selectedChatMentor, setSelectedChatMentor] = useState(null);
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleBookingConfirmed = (newSession) => {
    setUpcomingSessions(prev => [newSession, ...prev]);
    showToast(`Session booked with ${newSession.mentorName}! Check your Dashboard.`);
    setSelectedBookingMentor(null);
  };

  const handleAddGoal = (newGoal) => {
    setLearningGoals(prev => [newGoal, ...prev]);
    showToast(`New learning goal added: "${newGoal.title}"`);
  };

  const handleExploreSkillMentors = (skillName) => {
    setActiveTab('explore');
    // Pre-filtering happens naturally or user can search
    showToast(`Filtered mentors for ${skillName}`);
  };

  const handleUpdateProfile = (updatedProfile) => {
    setUserProfile(updatedProfile);
    showToast('Profile information successfully updated!');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800">
      
      {/* Top Navigation */}
      <Navbar
        currentRole={currentRole}
        setCurrentRole={setCurrentRole}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userProfile={userProfile}
        onOpenSearch={() => setActiveTab('explore')}
      />

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-8">
        
        {/* Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          currentRole={currentRole}
          streakCount={userProfile.stats.currentStreak}
          onOpenBooking={() => setSelectedBookingMentor(mentors[0])}
        />

        {/* Dynamic Page Content */}
        <main className="flex-1 min-w-0">
          
          {activeTab === 'dashboard' && (
            <Dashboard
              userProfile={userProfile}
              upcomingSessions={upcomingSessions}
              learningGoals={learningGoals}
              mentorsData={mentors}
              setActiveTab={setActiveTab}
              onBookSession={(m) => setSelectedBookingMentor(m)}
              onOpenAddGoal={() => setIsAddGoalOpen(true)}
            />
          )}

          {activeTab === 'explore' && (
            <ExploreMentors
              mentors={mentors}
              onBookSession={(m) => setSelectedBookingMentor(m)}
              onStartChat={(m) => setSelectedChatMentor(m)}
            />
          )}

          {activeTab === 'my-mentors' && (
            <MyMentors
              upcomingSessions={upcomingSessions}
              pastSessions={pastSessions}
              mentorsData={mentors}
              onBookSession={(m) => setSelectedBookingMentor(m)}
              onStartChat={(m) => setSelectedChatMentor(m)}
            />
          )}

          {activeTab === 'progress' && (
            <Progress
              goals={learningGoals}
              setGoals={setLearningGoals}
              badges={badges}
              userProfile={userProfile}
              onOpenAddGoal={() => setIsAddGoalOpen(true)}
            />
          )}

          {activeTab === 'skills' && (
            <Skills
              skillsCatalog={skillsCatalog}
              userProfile={userProfile}
              onExploreSkillMentors={handleExploreSkillMentors}
            />
          )}

          {activeTab === 'profile' && (
            <Profile
              userProfile={userProfile}
              onUpdateProfile={handleUpdateProfile}
              currentRole={currentRole}
              setCurrentRole={setCurrentRole}
            />
          )}

        </main>
      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-700 animate-in slide-in-from-bottom-5 duration-200">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <p className="text-xs font-semibold">{toastMessage}</p>
        </div>
      )}

      {/* Modals */}
      {selectedBookingMentor && (
        <BookSessionModal
          mentor={selectedBookingMentor}
          onClose={() => setSelectedBookingMentor(null)}
          onBookingConfirmed={handleBookingConfirmed}
        />
      )}

      {selectedChatMentor && (
        <ChatModal
          mentor={selectedChatMentor}
          initialMessages={mockMessages[selectedChatMentor.id] || []}
          onClose={() => setSelectedChatMentor(null)}
          onBookSession={(m) => {
            setSelectedChatMentor(null);
            setSelectedBookingMentor(m);
          }}
        />
      )}

      {isAddGoalOpen && (
        <AddGoalModal
          onClose={() => setIsAddGoalOpen(false)}
          onAddGoal={handleAddGoal}
        />
      )}

    </div>
  );
}

