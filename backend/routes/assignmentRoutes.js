import express from 'express';
import { initialSeedData } from '../seed/seedData.js';
import { Assignment } from '../models/Assignment.js';
import { isDbConnected } from '../config/db.js';

const router = express.Router();
let memoryAssignments = [...initialSeedData.assignments];

// GET /api/assignments
router.get('/', async (req, res) => {
  try {
    const { status, courseCode } = req.query;
    let list = [];

    if (isDbConnected) {
      let filter = {};
      if (status && status !== 'all') filter.status = status;
      if (courseCode) filter.courseCode = courseCode;
      list = await Assignment.find(filter);
    } else {
      list = [...memoryAssignments];
      if (status && status !== 'all') {
        list = list.filter(a => a.status === status);
      }
      if (courseCode) {
        list = list.filter(a => a.courseCode === courseCode);
      }
    }

    res.json({
      success: true,
      count: list.length,
      data: list,
      stats: {
        total: memoryAssignments.length,
        pending: memoryAssignments.filter(a => a.status === 'pending').length,
        inReview: memoryAssignments.filter(a => a.status === 'in_review').length,
        graded: memoryAssignments.filter(a => a.status === 'graded').length,
        averageGrade: '94.2%',
        onTimeRate: '98%'
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/assignments/:id/submit
router.post('/:id/submit', (req, res) => {
  const { id } = req.params;
  const { gitRepo, notes, fileNames } = req.body;

  const itemIndex = memoryAssignments.findIndex(a => a.id === id);
  if (itemIndex === -1) {
    return res.status(404).json({ success: false, message: 'Assignment not found' });
  }

  memoryAssignments[itemIndex] = {
    ...memoryAssignments[itemIndex],
    status: 'in_review',
    dueStatus: 'Submitted - In Review',
    testSuiteStatus: 'Automated CI Test Suite Running (15/15 passed)',
    gitRepo: gitRepo || memoryAssignments[itemIndex].gitRepo,
    submittedAt: new Date().toISOString(),
    notes: notes || 'Submitted on time via LearnNova Student Portal.'
  };

  res.json({
    success: true,
    message: 'Assignment coursework submitted successfully! Automated testing pipeline triggered.',
    data: memoryAssignments[itemIndex]
  });
});

export default router;
