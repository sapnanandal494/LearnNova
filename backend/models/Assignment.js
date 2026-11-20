import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    courseCode: { type: String, required: true },
    courseName: { type: String, required: true },
    dueDate: { type: String, required: true },
    dueStatus: { type: String, default: 'Upcoming' },
    status: { type: String, enum: ['pending', 'in_review', 'graded'], default: 'pending' },
    type: { type: String, enum: ['lab', 'capstone', 'theory'], default: 'lab' },
    grade: { type: String },
    score: { type: Number },
    maxScore: { type: Number, default: 100 },
    testSuiteStatus: { type: String, default: 'Pending Tests' },
    gitRepo: { type: String },
    submittedAt: { type: Date },
    instructions: { type: String }
  },
  { timestamps: true }
);

export const Assignment = mongoose.model('Assignment', assignmentSchema);
