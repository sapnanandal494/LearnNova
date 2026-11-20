import express from 'express';
import { initialSeedData } from '../seed/seedData.js';
import { Course } from '../models/Course.js';
import { isDbConnected } from '../config/db.js';

const router = express.Router();
let memoryCourses = [...initialSeedData.courses];

// GET /api/courses
router.get('/', async (req, res) => {
  try {
    const { department, level, search, sort } = req.query;
    let coursesList = [];

    if (isDbConnected) {
      let filter = {};
      if (department) filter.department = department;
      if (level) filter.level = level;
      if (search) {
        filter.$or = [
          { title: { $regex: search, $options: 'i' } },
          { code: { $regex: search, $options: 'i' } },
          { instructor: { $regex: search, $options: 'i' } }
        ];
      }
      coursesList = await Course.find(filter);
    } else {
      coursesList = [...memoryCourses];
      if (department) {
        coursesList = coursesList.filter(c => c.department.toLowerCase() === department.toLowerCase());
      }
      if (level) {
        coursesList = coursesList.filter(c => c.level.toLowerCase() === level.toLowerCase());
      }
      if (search) {
        const q = search.toLowerCase();
        coursesList = coursesList.filter(
          c => c.title.toLowerCase().includes(q) || c.code.toLowerCase().includes(q) || c.instructor.toLowerCase().includes(q)
        );
      }
      if (sort === 'highest_rated') {
        coursesList.sort((a, b) => b.rating - a.rating);
      } else if (sort === 'price_low') {
        coursesList.sort((a, b) => a.price - b.price);
      } else {
        coursesList.sort((a, b) => b.enrolledCount - a.enrolledCount);
      }
    }

    res.json({
      success: true,
      count: coursesList.length,
      data: coursesList
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/courses/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let course;

    if (isDbConnected) {
      course = await Course.findOne({ $or: [{ _id: id }, { code: id }, { id }] });
    } else {
      course = memoryCourses.find(c => c.id === id || c.code === id || c._id === id);
    }

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    res.json({ success: true, data: course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/courses/:id/enroll
router.post('/:id/enroll', (req, res) => {
  const { id } = req.params;
  const course = memoryCourses.find(c => c.id === id || c.code === id);
  if (!course) {
    return res.status(404).json({ success: false, message: 'Course not found' });
  }

  course.enrolledCount += 1;
  res.json({
    success: true,
    message: `Successfully enrolled in ${course.code}: ${course.title}!`,
    data: course
  });
});

export default router;
