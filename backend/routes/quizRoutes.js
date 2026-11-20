import express from 'express';
import { initialSeedData } from '../seed/seedData.js';
import { Quiz } from '../models/Quiz.js';
import { isDbConnected } from '../config/db.js';

const router = express.Router();
let memoryQuizzes = [...initialSeedData.quizzes];

// GET /api/quizzes
router.get('/', async (req, res) => {
  try {
    const list = [...memoryQuizzes];
    res.json({
      success: true,
      data: list,
      stats: {
        averageScore: '92.4%',
        completedCount: 18,
        upcomingCount: list.filter(q => q.status === 'upcoming').length,
        activeCount: list.filter(q => q.status === 'active').length,
        drillStreakDays: 14,
        rank: 'Top 4% in Class (Grade A+ Honors)'
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/quizzes/:id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const quiz = memoryQuizzes.find(q => q.id === id);
  if (!quiz) {
    return res.status(404).json({ success: false, message: 'Quiz not found' });
  }

  // Return quiz without exposing answers before submission if needed, or with questions
  res.json({ success: true, data: quiz });
});

// POST /api/quizzes/:id/submit
router.post('/:id/submit', (req, res) => {
  const { id } = req.params;
  const { answers } = req.body; // e.g. { 0: 0, 1: 0, 2: 1, 3: 0, 4: 0 }

  const quiz = memoryQuizzes.find(q => q.id === id);
  if (!quiz) {
    return res.status(404).json({ success: false, message: 'Quiz not found' });
  }

  let correctCount = 0;
  const results = quiz.questions.map((q, idx) => {
    const chosen = answers ? answers[idx] : null;
    const isCorrect = chosen === q.correctAnswer;
    if (isCorrect) correctCount += 1;
    return {
      questionIndex: idx,
      userAnswer: chosen,
      correctAnswer: q.correctAnswer,
      isCorrect,
      explanation: q.explanation
    };
  });

  const percentage = Math.round((correctCount / quiz.questions.length) * 100);
  quiz.userScore = percentage;
  quiz.status = 'completed';

  res.json({
    success: true,
    message: `Assessment submitted! You scored ${percentage}% (${correctCount}/${quiz.questions.length})`,
    score: percentage,
    correctCount,
    totalQuestions: quiz.questions.length,
    xpAwarded: quiz.xpReward,
    details: results
  });
});

export default router;
