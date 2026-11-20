# 🎓 LearnNova — Full-Stack Education Platform

> **Learn Today. Lead Tomorrow.**
> A production-grade, full-stack digital learning platform with AI assistant, real-time timetable, admin panel, and expert lecture playback.

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, Vite 6, React Router 6, Tailwind CSS 3, Axios |
| **Backend** | Node.js 20, Express.js, JWT Auth, bcryptjs |
| **Database** | MongoDB (Atlas) + resilient in-memory fallback |
| **Deployment** | Cloudflare Pages (frontend) + Render.com (backend) |

---

## 📁 Project Structure

```
stitch file/
├── frontend/               # React + Vite app
│   ├── src/
│   │   ├── pages/
│   │   │   ├── public/     # Landing, Courses, Lectures, Contact
│   │   │   ├── dashboard/  # Student portal pages
│   │   │   └── admin/      # Admin login & dashboard
│   │   ├── components/
│   │   │   ├── public/     # Navbar, Footer, AuthModal
│   │   │   └── dashboard/  # Sidebar, Header, Modals
│   │   ├── context/        # AuthContext
│   │   └── api/            # Axios client & service modules
│   ├── public/
│   │   ├── _redirects      # Cloudflare Pages SPA routing
│   │   └── _headers        # Security headers
│   └── .env                # Frontend environment variables
├── backend/                # Express API server
│   ├── routes/             # All API route handlers
│   ├── models/             # Mongoose models
│   ├── seed/               # Seed data (in-memory fallback)
│   ├── config/db.js        # MongoDB connection
│   ├── server.js           # App entry point
│   └── .env                # Backend environment variables
├── render.yaml             # Render.com deployment config
├── .gitignore
└── README.md
```

---

## 🚀 Local Development

### Prerequisites
- Node.js v18+ (v20 recommended)
- npm or pnpm
- MongoDB (optional — app runs with in-memory data if unavailable)

### 1. Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Environment Variables

**Backend** (`backend/.env`):
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/learnnova
JWT_SECRET=your_jwt_secret_here
ADMIN_USERNAME=admin
ADMIN_PASSWORD=Admin@LearnNova2024
ADMIN_SECRET_TOKEN=learnnova-super-admin-secret-token-2024
```

**Frontend** (`frontend/.env`):
```env
VITE_API_BASE_URL=/api
VITE_APP_NAME=LearnNova
```

### 3. Start Backend (Port 5000)

```bash
cd backend
node server.js
```

### 4. Start Frontend Dev Server (Port 3000)

```bash
cd frontend
npx vite --port 3000
```

**Open:** http://localhost:3000

---

## 🔐 Demo Login Credentials

| Role | Email | Password |
|---|---|---|
| 👩‍🎓 Student | `elena.vance@learnnova.edu` | `password123` |
| 👨‍🏫 Teacher | `james.wilson@learnnova.edu` | `password123` |
| 🛡️ Admin | `admin` | `Admin@LearnNova2024` |

**Admin Panel:** http://localhost:3000/admin/login

---

## 🌍 Deployment

### Frontend → Cloudflare Pages

1. Push project to GitHub
2. Connect repo to Cloudflare Pages
3. Set build settings:
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** `frontend`
4. Add environment variable:
   - `VITE_API_BASE_URL` = `https://your-render-backend.onrender.com/api`

### Backend → Render.com

1. Connect GitHub repo to Render
2. Use `render.yaml` for auto-configuration, OR manually set:
   - **Root directory:** `backend`
   - **Build command:** `npm install`
   - **Start command:** `node server.js`
3. Add environment variables in Render dashboard:
   - `MONGODB_URI` — your MongoDB Atlas connection string
   - `ADMIN_PASSWORD` — secure password
   - All others auto-generated from `render.yaml`

---

## ✨ Features

### Public Site
- 🏠 **Landing Page** — Hero, features, stats, testimonials
- 📚 **Course Catalog** — 6 courses with filters, search, enrollment
- 🎓 **Expert Lectures** — Keynotes with YouTube embed player
- 📖 **Study Materials** — Downloadable PDFs and notebooks
- 📬 **Contact Page** — Form, map, address, office hours

### Student Dashboard (`/dashboard`)
- 📊 **Home** — KPIs, progress, AI recommendation
- 📚 **Courses** — Module syllabus, lecture player per course
- 📝 **Assignments** — Submit, view grades, track status
- 🧠 **Quizzes** — Take timed quizzes, see scores
- 📄 **Study Materials** — Upload & download
- 🤖 **AI Assistant** — Ask academic questions
- 📅 **Timetable** — Live active class detection, Watch Lecture buttons
- 📈 **Attendance & Analytics** — Charts, GPA, progress
- ⚙️ **Settings** — Profile, preferences

### Admin Panel (`/admin`)
- 🔐 **Secure Login** — Separate admin authentication
- 📊 **Overview** — System stats, recent activity
- 👥 **User Management** — Activate/deactivate/delete users
- 📚 **Course Management** — Publish/hide courses
- 📢 **Announcements** — Manage platform banners
- 📬 **Contact Info** — Edit institution details

---

## 🛠️ API Endpoints

```
POST   /api/auth/login          Student/teacher login
POST   /api/auth/register       User registration
GET    /api/auth/me             Current user profile

GET    /api/courses             All courses
GET    /api/courses/:id         Single course
POST   /api/courses/:id/enroll  Enroll in course

GET    /api/assignments         All assignments
POST   /api/assignments/:id/submit  Submit assignment

GET    /api/quizzes             All quizzes
POST   /api/quizzes/:id/submit  Submit quiz answers

GET    /api/lectures            Expert lectures
GET    /api/materials           Study materials

GET    /api/dashboard/overview  Student dashboard data
GET    /api/dashboard/timetable Weekly schedule

POST   /api/ai/ask              AI assistant query
GET    /api/health              Server health check

POST   /api/admin/login         Admin authentication
GET    /api/admin/stats         Platform statistics
GET    /api/admin/users         All users (admin)
GET    /api/admin/courses       All courses (admin)
GET    /api/admin/announcements Announcement list
```

---

## 📌 Notes

- **In-memory mode:** When MongoDB is unavailable, the app runs entirely from seed data. All features work — data resets on restart.
- **YouTube embeds:** Lecture players use real YouTube videos mapped per course.
- **Vite proxy:** In development, all `/api` requests are proxied to `http://localhost:5000`.
