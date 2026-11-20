import express from 'express';
import jwt from 'jsonwebtoken';
import { initialSeedData } from '../seed/seedData.js';
import { User } from '../models/User.js';
import { isDbConnected } from '../config/db.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'learnnova_secret_jwt_key_2026';

// In-memory user store initialized from seedData for instant resilient fallback
let memoryUsers = [...initialSeedData.users];

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password, role } = req.body;
    let user;

    if (isDbConnected) {
      user = await User.findOne({ email });
    } else {
      user = memoryUsers.find((u) => u.email.toLowerCase() === (email || '').toLowerCase());
    }

    // If demo email or user exists
    if (!user) {
      // Default to Elena Vance demo profile if not found
      user = memoryUsers[0];
    }

    const token = jwt.sign({ id: user._id || user.id, email: user.email, role: user.role }, JWT_SECRET, {
      expiresIn: '7d',
    });

    const userProfile = {
      id: user._id || user.id,
      name: user.name,
      email: user.email,
      role: role || user.role,
      avatar: user.avatar,
      degreeTrack: user.degreeTrack,
      term: user.term,
      academicSession: user.academicSession,
      streakDays: user.streakDays,
      weeklyGoalHours: user.weeklyGoalHours,
      loggedHours: user.loggedHours,
      averageScore: user.averageScore,
      gpa: user.gpa,
      attendanceRate: user.attendanceRate,
      enrolledCourses: user.enrolledCourses,
    };

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: userProfile,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role, degreeTrack } = req.body;
    if (!name || !email) {
      return res.status(400).json({ success: false, message: 'Name and email are required' });
    }

    const newUser = {
      id: `usr_${Date.now()}`,
      name,
      email,
      password: password || 'password123',
      role: role || 'student',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5O-qBknxwo4PYLNoJ8nze2vQgb2jjqsDgoNQIv2loDyg1yr-GP5SJOggO3BqBB2ud5OnTqpFxC18qEykpx-lUAgEhySRnB3t9dFkL5ASKxJyAWq-HWQJfmm9_ERrhffVGq6hDFyGtbS8SxrTdpWz05qz2xc2EgacPymmJ6JwXoXU7-pXak1Rn9MDG3lD25PpZmLsaQaCugTOnOU50Pvbvc3b5zzElYk2XYQjPJXA',
      degreeTrack: degreeTrack || 'Computer Science & AI Track',
      term: 'Fall 2024 • Term 2',
      academicSession: 'Academic Session 2024-2025',
      streakDays: 1,
      weeklyGoalHours: 20,
      loggedHours: 0,
      averageScore: 90,
      gpa: 3.8,
      attendanceRate: 100,
      enrolledCourses: ['CS-402', 'CS-501'],
    };

    if (isDbConnected) {
      const created = await User.create(newUser);
      newUser.id = created._id;
    } else {
      memoryUsers.push(newUser);
    }

    const token = jwt.sign({ id: newUser.id, email: newUser.email, role: newUser.role }, JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Current User Profile
router.get('/me', (req, res) => {
  const user = memoryUsers[0];
  res.json({
    success: true,
    user,
  });
});

export default router;
