import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['student', 'teacher', 'admin'], default: 'student' },
    avatar: { type: String, default: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5O-qBknxwo4PYLNoJ8nze2vQgb2jjqsDgoNQIv2loDyg1yr-GP5SJOggO3BqBB2ud5OnTqpFxC18qEykpx-lUAgEhySRnB3t9dFkL5ASKxJyAWq-HWQJfmm9_ERrhffVGq6hDFyGtbS8SxrTdpWz05qz2xc2EgacPymmJ6JwXoXU7-pXak1Rn9MDG3lD25PpZmLsaQaCugTOnOU50Pvbvc3b5zzElYk2XYQjPJXA' },
    degreeTrack: { type: String, default: 'Dual Degree Track: Artificial Intelligence & Neuroscience' },
    term: { type: String, default: 'Fall 2024 • Term 2' },
    academicSession: { type: String, default: 'Academic Session 2024-2025' },
    streakDays: { type: Number, default: 6 },
    weeklyGoalHours: { type: Number, default: 20 },
    loggedHours: { type: Number, default: 15.6 },
    averageScore: { type: Number, default: 91.5 },
    gpa: { type: Number, default: 3.88 },
    attendanceRate: { type: Number, default: 92.4 },
    enrolledCourses: [{ type: String }],
  },
  { timestamps: true }
);

export const User = mongoose.model('User', userSchema);
