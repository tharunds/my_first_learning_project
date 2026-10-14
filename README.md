# SkillBridge 🚀
### A Peer-to-Peer Volunteer Mentorship & Learning Platform

**SkillBridge** connects ambitious learners with experienced volunteer mentors. Whether you're preparing for technical interviews, debugging production architectures, or taking your first steps in coding, SkillBridge enables free 1-on-1 mentorship, goal tracking, and community skill exchange.

---

## 🌟 Key Features & Frontend Sections

1. **Dashboard**
   - Personalized learner welcome banner and quick actions
   - High-level progress metrics: Total hours learned, sessions completed, active streak, and connected mentors
   - **Next Upcoming Mentorship Session spotlight** with 1-click Google Meet room launcher
   - Active learning goals snapshot & weekly featured volunteer mentors

2. **Explore Mentors**
   - Search mentors by name, company, bio, and technology (React, Python, AWS, Docker, System Design, Figma, etc.)
   - Category filters: Frontend, Backend, AI & Data, DevOps, UI/UX, and Career Guidance
   - Filter and sort by highest rated or most sessions completed
   - **Interactive "Book Free Session" Modal**: Select session type, date, time slot, and specify custom topics / repo links
   - **Direct Mentor Chat Modal** to preview discussions and coordinate before calls

3. **My Mentors**
   - **Upcoming Calls**: Scheduled 1-on-1 sessions with Google Meet launch links and preparation notes
   - **Connected Mentors**: Directory of all mentors you've collaborated with
   - **Past Feedback & Notes**: Recorded feedback, advice, and ratings from completed sessions

4. **Progress & Goals**
   - Interactive roadmaps: Click any milestone checkbox to mark it done or pending (automatically updates goal progress percentage)
   - Goal creation modal with customizable milestones, domains, and target dates
   - Community badges and achievements showcase (Curious Learner, Consistency Ace, Volunteer Mentor, Knowledge Seeker)

5. **Skills Catalog**
   - Interactive categorized matrix across Frontend, Backend, AI/Data, DevOps, and UI/UX
   - **"Want to Learn" vs "Can Mentor (Volunteer)"** toggles on every skill
   - Instant search and 1-click deep links to find mentors for any selected skill

6. **Profile (Dual Learner & Volunteer Identity)**
   - Public learner profile with editable bio, target roles, social links (GitHub, LinkedIn, Website), and timezone
   - **Volunteer Mentor Mode**: Easily register skills you can mentor to give back to beginners for free
   - Learning stats & hours breakdown

---

## 🛠️ Tech Stack

- **React 19**
- **Vite** (Lightning fast dev server and bundler)
- **Tailwind CSS 3** (Responsive, modern styling and customized brand palette)
- **Lucide React** (Clean, consistent iconography)

---

## 📁 Project Structure

```
my_first_learning_project/
├── frontend/                        # Frontend application directory
│   ├── index.html                   # HTML template with modern typography & meta
│   ├── vite.config.js               # Vite configuration
│   ├── tailwind.config.js           # Tailwind configuration & custom theme
│   ├── postcss.config.js            # PostCSS configuration
│   ├── package.json                 # Frontend dependencies & scripts
│   └── src/
│       ├── main.jsx                 # Application entry point
│       ├── App.jsx                  # Root controller with state management
│       ├── index.css                # Tailwind directives & custom scrollbars
│       ├── data/
│       │   └── mockData.js          # Initial profiles, mentors, sessions, & badges
│       └── components/              # Modular UI components
│           ├── Navbar.jsx           # Header, search, notifications & role switch
│           ├── Sidebar.jsx          # Navigation tabs & streak counter
│           ├── Dashboard.jsx        # Welcome banner, stats & upcoming session
│           ├── ExploreMentors.jsx   # Search, domain filters & mentor cards
│           ├── MyMentors.jsx        # Upcoming calls & past feedback notes
│           ├── Progress.jsx         # Milestone checklist & badges gallery
│           ├── Skills.jsx           # Categorized skills matrix
│           ├── Profile.jsx          # Dual learner & volunteer identity
│           ├── BookSessionModal.jsx # Mentorship session booking modal
│           ├── ChatModal.jsx        # Direct messaging modal
│           └── AddGoalModal.jsx     # Learning goal creation modal
├── package.json                     # Root scripts for convenience
└── README.md
```

---

## 🚀 Getting Started

### 1. Start the Development Server
You can run it directly from the project root:
```bash
npm run dev
```
*(Or navigate to the frontend folder and run it there: `cd frontend && npm run dev`)*

Open your browser at **`http://localhost:3000`** to view the SkillBridge web app.

### 2. Build for Production
```bash
npm run build
```
*(Or inside frontend: `cd frontend && npm run build`)*
The production bundle will be compiled into `frontend/dist/`.
