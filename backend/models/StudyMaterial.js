import mongoose from 'mongoose';

const studyMaterialSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    courseCode: { type: String, required: true },
    subject: { type: String, required: true },
    fileType: { type: String, default: 'PDF' },
    fileSize: { type: String, default: '3.4 MB' },
    author: { type: String, default: 'Department of Computer Science' },
    downloads: { type: Number, default: 240 },
    isAiGenerated: { type: Boolean, default: false },
    badge: { type: String, default: 'Verified Syllabi' },
    url: { type: String, default: '#' }
  },
  { timestamps: true }
);

export const StudyMaterial = mongoose.model('StudyMaterial', studyMaterialSchema);
