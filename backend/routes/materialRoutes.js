import express from 'express';
import { initialSeedData } from '../seed/seedData.js';
import { StudyMaterial } from '../models/StudyMaterial.js';
import { isDbConnected } from '../config/db.js';

const router = express.Router();
let memoryMaterials = [...initialSeedData.studyMaterials];

// GET /api/materials
router.get('/', (req, res) => {
  const { search, subject } = req.query;
  let list = [...memoryMaterials];

  if (search) {
    const q = search.toLowerCase();
    list = list.filter(m => m.title.toLowerCase().includes(q) || m.courseCode.toLowerCase().includes(q) || m.subject.toLowerCase().includes(q));
  }
  if (subject && subject !== 'All') {
    list = list.filter(m => m.subject.toLowerCase() === subject.toLowerCase());
  }

  res.json({
    success: true,
    count: list.length,
    data: list
  });
});

// POST /api/materials/upload
router.post('/upload', (req, res) => {
  const { title, courseCode, subject, fileType, author } = req.body;
  if (!title || !courseCode) {
    return res.status(400).json({ success: false, message: 'Title and Course Code are required' });
  }

  const newDoc = {
    id: `mat_${Date.now()}`,
    title,
    courseCode,
    subject: subject || 'Computer Science',
    fileType: fileType || 'PDF',
    fileSize: '3.1 MB',
    author: author || 'Elena Vance (Student Submission)',
    downloads: 1,
    isAiGenerated: false,
    badge: 'Peer Shared',
    url: '#'
  };

  memoryMaterials.unshift(newDoc);
  res.status(201).json({
    success: true,
    message: 'Document published to academic archive successfully!',
    data: newDoc
  });
});

// POST /api/materials/:id/download
router.post('/:id/download', (req, res) => {
  const { id } = req.params;
  const doc = memoryMaterials.find(m => m.id === id);
  if (doc) {
    doc.downloads += 1;
  }
  res.json({ success: true, message: 'Download initiated', data: doc });
});

export default router;
