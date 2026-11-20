import mongoose from 'mongoose';

const lectureSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    speaker: { type: String, required: true },
    speakerTitle: { type: String, required: true },
    speakerAvatar: { type: String },
    category: { type: String, default: 'Artificial Intelligence' },
    date: { type: String, required: true },
    time: { type: String, required: true },
    status: { type: String, enum: ['live', 'upcoming', 'recorded'], default: 'upcoming' },
    registeredCount: { type: Number, default: 480 },
    playbackUrl: { type: String },
    badge: { type: String, default: 'Turing Laureate Keynote' },
    description: { type: String }
  },
  { timestamps: true }
);

export const Lecture = mongoose.model('Lecture', lectureSchema);
