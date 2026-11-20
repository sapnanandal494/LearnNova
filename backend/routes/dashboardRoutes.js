import express from 'express';
import { initialSeedData } from '../seed/seedData.js';

const router = express.Router();

// GET /api/dashboard/overview
router.get('/overview', (req, res) => {
  const user = initialSeedData.users[0]; // Elena Vance
  const activeCourses = initialSeedData.courses.filter(c => user.enrolledCourses.includes(c.code));
  const pendingAssignments = initialSeedData.assignments.filter(a => a.status === 'pending');
  const quizzes = initialSeedData.quizzes;
  const timetable = initialSeedData.timetable;

  res.json({
    success: true,
    data: {
      student: user,
      kpis: {
        enrolledCoursesCount: activeCourses.length,
        totalCredits: 22.0,
        pendingAssignmentsCount: pendingAssignments.length,
        attendanceRate: user.attendanceRate,
        averageTestScore: user.averageScore,
        streakDays: user.streakDays,
        weeklyGoalHours: user.weeklyGoalHours,
        loggedHours: user.loggedHours,
        progressPercent: Math.round((user.loggedHours / user.weeklyGoalHours) * 100),
      },
      activeCourses,
      pendingAssignments,
      quizzes,
      timetableToday: timetable.slice(0, 3),
      aiRecommendation: {
        title: "Adaptive Milestone: Backpropagation Optimization",
        reason: "Based on your 75% progress in CS-402, reviewing computational graphs will boost your upcoming Quiz score by an estimated +8%.",
        targetModule: "CS-402 Module 1: Computational Graphs",
        xpBooster: "1.5x Active"
      }
    }
  });
});

// GET /api/dashboard/timetable
router.get('/timetable', (req, res) => {
  res.json({
    success: true,
    data: initialSeedData.timetable
  });
});

export default router;
