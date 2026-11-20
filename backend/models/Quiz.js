import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    courseCode: { type: String, required: true },
    courseName: { type: String, required: true },
    category: { type: String, default: 'Diagnostic' },
    status: { type: String, enum: ['upcoming', 'active', 'completed'], default: 'active' },
    totalQuestions: { type: Number, default: 5 },
    durationMinutes: { type: Number, default: 15 },
    dueDate: { type: String, default: 'Tomorrow, 11:59 PM' },
    highScore: { type: Number, default: 95 },
    userScore: { type: Number },
    xpReward: { type: Number, default: 150 },
    questions: [
      {
        question: { type: String, required: true },
        options: [{ type: String, required: true }],
        correctAnswer: { type: Number, required: true }, // index of correct option
        explanation: { type: String }
      }
    ]
  },
  { timestamps: true }
);

export const Quiz = mongoose.model('Quiz', quizSchema);
