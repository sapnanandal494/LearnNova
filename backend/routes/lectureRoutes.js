import express from 'express';
import { initialSeedData } from '../seed/seedData.js';
import { Lecture } from '../models/Lecture.js';
import { isDbConnected } from '../config/db.js';

const router = express.Router();
let memoryLectures = [...initialSeedData.lectures];

// GET /api/lectures
router.get('/', (req, res) => {
  const { category, status } = req.query;
  let list = [...memoryLectures];

  if (category && category !== 'All') {
    list = list.filter(l => l.category.toLowerCase().includes(category.toLowerCase()));
  }
  if (status) {
    list = list.filter(l => l.status === status);
  }

  res.json({
    success: true,
    data: list
  });
});

// POST /api/lectures/:id/register
router.post('/:id/register', (req, res) => {
  const { id } = req.params;
  const lecture = memoryLectures.find(l => l.id === id);
  if (!lecture) {
    return res.status(404).json({ success: false, message: 'Keynote session not found' });
  }

  lecture.registeredCount += 1;
  res.json({
    success: true,
    message: `You are registered for: ${lecture.title}! Calendar invite sent.`,
    data: lecture
  });
});

export default router;
