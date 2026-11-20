import express from 'express';
import { initialSeedData } from '../seed/seedData.js';

const router = express.Router();

// Mutable in-memory copy for admin operations
let adminUsers = initialSeedData.users.map(u => ({ ...u, isActive: true }));
let adminCourses = initialSeedData.courses.map(c => ({ ...c, isHidden: false }));

function adminAuth(req, res, next) {
  const token = req.headers['x-admin-token'];
  const expected = process.env.ADMIN_SECRET_TOKEN || 'learnnova-super-admin-secret-token-2024';
  if (!token || token !== expected) {
    return res.status(401).json({ error: 'Unauthorized: Invalid admin token' });
  }
  next();
}

// POST /api/admin/login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const validUser = process.env.ADMIN_USERNAME || 'admin';
  const validPass = process.env.ADMIN_PASSWORD || 'Admin@LearnNova2024';
  if (username === validUser && password === validPass) {
    return res.json({
      success: true,
      token: process.env.ADMIN_SECRET_TOKEN || 'learnnova-super-admin-secret-token-2024',
      admin: { username, role: 'superadmin', name: 'Super Admin' },
    });
  }
  res.status(401).json({ error: 'Invalid admin credentials' });
});

// GET /api/admin/stats
router.get('/stats', adminAuth, (req, res) => {
  res.json({
    totalUsers:       adminUsers.length,
    totalCourses:     adminCourses.length,
    totalAssignments: initialSeedData.assignments.length,
    totalQuizzes:     initialSeedData.quizzes.length,
    totalLectures:    initialSeedData.lectures.length,
    totalMaterials:   initialSeedData.studyMaterials.length,
    totalEnrollments: adminUsers.reduce((s, u) => s + (u.enrolledCourses?.length || 0), 0),
    averageGPA: (adminUsers.reduce((s, u) => s + (u.gpa || 0), 0) / adminUsers.length).toFixed(2),
  });
});

// GET /api/admin/users
router.get('/users', adminAuth, (req, res) => {
  const safe = adminUsers.map(({ password, ...u }) => u);
  res.json(safe);
});

// PATCH /api/admin/users/:id/toggle
router.patch('/users/:id/toggle', adminAuth, (req, res) => {
  const user = adminUsers.find(u => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  user.isActive = !user.isActive;
  res.json({ id: user.id, isActive: user.isActive });
});

// DELETE /api/admin/users/:id
router.delete('/users/:id', adminAuth, (req, res) => {
  const idx = adminUsers.findIndex(u => u.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'User not found' });
  adminUsers.splice(idx, 1);
  res.json({ success: true });
});

// GET /api/admin/courses
router.get('/courses', adminAuth, (req, res) => {
  res.json(adminCourses);
});

// PATCH /api/admin/courses/:id/toggle
router.patch('/courses/:id/toggle', adminAuth, (req, res) => {
  const course = adminCourses.find(c => c.id === req.params.id);
  if (!course) return res.status(404).json({ error: 'Course not found' });
  course.isHidden = !course.isHidden;
  res.json({ id: course.id, isHidden: course.isHidden });
});

// GET /api/admin/announcements
router.get('/announcements', adminAuth, (req, res) => {
  res.json([
    { id: 1, title: 'New Semester Starting Nov 1st',                   date: '2024-11-01', active: true  },
    { id: 2, title: 'Expert Lecture by Dr. Priya Sharma on AI Ethics', date: '2024-11-10', active: true  },
    { id: 3, title: '10,000+ Study Materials Free Access',             date: '2024-11-15', active: true  },
    { id: 4, title: 'Hackathon Season 3 Open',                         date: '2024-11-18', active: false },
  ]);
});

export default router;
