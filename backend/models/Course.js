import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    instructor: { type: String, required: true },
    instructorRole: { type: String, default: 'Professor' },
    department: { type: String, required: true },
    level: { type: String, enum: ['Beginner', 'Intermediate', 'Graduate'], default: 'Intermediate' },
    credits: { type: Number, default: 4.0 },
    durationHours: { type: Number, default: 40 },
    rating: { type: Number, default: 4.8 },
    reviewCount: { type: Number, default: 120 },
    enrolledCount: { type: Number, default: 1240 },
    price: { type: Number, default: 2999 },
    isFree: { type: Boolean, default: false },
    thumbnail: { type: String },
    tags: [{ type: String }],
    description: { type: String },
    progress: { type: Number, default: 0 },
    totalLessons: { type: Number, default: 24 },
    completedLessons: { type: Number, default: 0 },
    nextLesson: { type: String, default: 'Introduction to Core Fundamentals' },
    modules: [
      {
        title: { type: String },
        duration: { type: String },
        lessonsCount: { type: Number },
        isCompleted: { type: Boolean, default: false }
      }
    ]
  },
  { timestamps: true }
);

export const Course = mongoose.model('Course', courseSchema);
