# SkillBridge 🚀
### A Peer-to-Peer Volunteer Mentorship & Learning Platform

**SkillBridge** connects ambitious learners with experienced volunteer mentors. Whether you're preparing for technical interviews, debugging production architectures, or taking your first steps in coding, SkillBridge enables free 1-on-1 mentorship, goal tracking, and community skill exchange.

---

## 📁 Project Architecture

```
my_first_learning_project/
├── backend/                         # Express.js REST API Backend
│   ├── src/
│   │   ├── server.js                # Server entry point (port 5000)
│   │   ├── app.js                   # Express application & middleware
│   │   ├── config/                  # Environment variables & constants
│   │   ├── data/
│   │   │   ├── store.js             # Data repository & file persistence
│   │   │   └── initialData.json     # Seed dataset
│   │   ├── controllers/             # Business logic handlers
│   │   │   ├── profileController.js # Learner profile & volunteer toggle
│   │   │   ├── mentorController.js  # Search & mentor queries
│   │   │   ├── sessionController.js # Book, view & cancel sessions
│   │   │   ├── goalController.js    # Learning roadmaps & milestones
│   │   │   ├── skillController.js   # Skills catalog & preferences
│   │   │   └── messageController.js # Direct messaging
│   │   ├── routes/                  # RESTful API route definitions
│   │   └── middleware/              # Error & 404 handlers
│   ├── .env.example
│   └── package.json
│
├── frontend/                        # React 19 + Vite + Tailwind CSS Frontend
│   ├── index.html                   # HTML template with modern typography
│   ├── vite.config.js               # Vite config with backend proxy (/api -> :5000)
│   ├── tailwind.config.js           # Tailwind theme configuration
│   ├── postcss.config.js
│   ├── package.json
│   └── src/
│       ├── main.jsx                 # Client entry point
│       ├── App.jsx                  # Main coordinator & reactive state
│       ├── index.css                # Global styles
│       ├── services/
│       │   └── api.js               # Resilient API client with fallback
│       ├── data/
│       │   └── mockData.js          # Offline fallback dataset
│       └── components/              # Modular UI components
│           ├── Navbar.jsx           # Top header, search & role switch
│           ├── Sidebar.jsx          # Navigation tabs & streak counter
│           ├── Dashboard.jsx        # Learner overview, stats, next session
│           ├── ExploreMentors.jsx   # Search & filter volunteer mentors
│           ├── MyMentors.jsx        # Scheduled calls & past feedback
│           ├── Progress.jsx         # Milestone checklist & community badges
│           ├── Skills.jsx           # Categorized skills exchange
│           ├── Profile.jsx          # Dual learner & volunteer identity
│           ├── BookSessionModal.jsx # Mentorship session booking modal
│           ├── ChatModal.jsx        # Direct messaging modal
│           └── AddGoalModal.jsx     # Learning goal creation modal
│
├── package.json                     # Root scripts for smooth concurrent development
└── README.md
```

---

## 📡 REST API Reference

| Endpoint | Method | Description |
|---|---|---|
| `/api/health` | `GET` | Health check and server status |
| `/api/profile` | `GET` | Fetch learner & volunteer profile details |
| `/api/profile` | `PUT` | Update bio, target roles, location, and social links |
| `/api/profile/toggle-volunteer` | `POST` | Toggle volunteer mentor availability mode |
| `/api/mentors` | `GET` | Query mentors (supports `?category=`, `?query=`, `?sortBy=`) |
| `/api/mentors/:id` | `GET` | Fetch detailed profile for a specific mentor |
| `/api/sessions/upcoming` | `GET` | List scheduled 1-on-1 calls with meeting rooms |
| `/api/sessions/past` | `GET` | List completed mentorship sessions & reviews |
| `/api/sessions/book` | `POST` | Reserve a free volunteer session |
| `/api/sessions/:id` | `DELETE` | Cancel or remove a scheduled session |
| `/api/goals` | `GET` | Retrieve active learning roadmaps & milestones |
| `/api/goals` | `POST` | Create a new learning goal with milestones |
| `/api/goals/:goalId/milestones/:id` | `PATCH` | Toggle milestone completion checkbox |
| `/api/goals/badges` | `GET` | List community achievement badges |
| `/api/skills` | `GET` | Get categorized skills matrix |
| `/api/skills/toggle-learn` | `POST` | Add/remove skill from "Want to Learn" list |
| `/api/skills/toggle-mentor` | `POST` | Add/remove skill from "Can Mentor" list |
| `/api/messages/:mentorId` | `GET` | Retrieve message history with a mentor |
| `/api/messages/:mentorId` | `POST` | Send a new message to a mentor |

---

## 🚀 Smooth Development Workflow

### Start Full-Stack App with a Single Command
From the project root:
```bash
npm run dev
```
*This uses `concurrently` to spin up both the Express backend (`http://localhost:5000`) and the Vite frontend (`http://localhost:3000`) with unified colored terminal logging.*

### Individual Services
- **Backend only**:
  ```bash
  npm run server
  # or: cd backend && npm run dev
  ```
- **Frontend only**:
  ```bash
  npm run client
  # or: cd frontend && npm run dev
  ```
- **Production Build**:
  ```bash
  npm run build
  ```
