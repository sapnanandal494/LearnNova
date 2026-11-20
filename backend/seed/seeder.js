// LearnNova Atlas Seeder — run once to populate MongoDB with seed data
// Usage: node backend/seed/seeder.js

import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { initialSeedData } from './seedData.js';
import { User } from '../models/User.js';
import { Course } from '../models/Course.js';
import { Assignment } from '../models/Assignment.js';
import { Quiz } from '../models/Quiz.js';
import { Lecture } from '../models/Lecture.js';
import { StudyMaterial } from '../models/StudyMaterial.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config({ path: path.resolve(__dirname, '../.env'), override: true });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI || MONGODB_URI.includes('<db_password>')) {
  console.error('❌ MONGODB_URI not set or still has placeholder. Check backend/.env');
  process.exit(1);
}

async function seed() {
  try {
    console.log('🔗 Connecting to Atlas...');
    await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 15000 });
    console.log('✅ Connected to Atlas:', mongoose.connection.host);

    // Clear existing data
    console.log('\n🗑️  Clearing existing collections...');
    await Promise.all([
      User.deleteMany({}),
      Course.deleteMany({}),
      Assignment.deleteMany({}),
      Quiz.deleteMany({}),
      Lecture.deleteMany({}),
      StudyMaterial.deleteMany({}),
    ]);
    console.log('   Cleared: users, courses, assignments, quizzes, lectures, materials');

    // Seed Users
    if (initialSeedData.users?.length) {
      const users = initialSeedData.users.map(u => ({ ...u, _id: undefined }));
      await User.insertMany(users, { ordered: false });
      console.log(`✅ Seeded ${users.length} users`);
    }

    // Seed Courses
    if (initialSeedData.courses?.length) {
      const courses = initialSeedData.courses.map(c => ({ ...c, _id: undefined }));
      await Course.insertMany(courses, { ordered: false });
      console.log(`✅ Seeded ${courses.length} courses`);
    }

    // Seed Assignments
    if (initialSeedData.assignments?.length) {
      const assignments = initialSeedData.assignments.map(a => ({ ...a, _id: undefined }));
      await Assignment.insertMany(assignments, { ordered: false });
      console.log(`✅ Seeded ${assignments.length} assignments`);
    }

    // Seed Quizzes
    if (initialSeedData.quizzes?.length) {
      const quizzes = initialSeedData.quizzes.map(q => ({ ...q, _id: undefined }));
      await Quiz.insertMany(quizzes, { ordered: false });
      console.log(`✅ Seeded ${quizzes.length} quizzes`);
    }

    // Seed Lectures
    if (initialSeedData.lectures?.length) {
      const lectures = initialSeedData.lectures.map(l => ({ ...l, _id: undefined }));
      await Lecture.insertMany(lectures, { ordered: false });
      console.log(`✅ Seeded ${lectures.length} lectures`);
    }

    // Seed Study Materials
    if (initialSeedData.materials?.length) {
      const materials = initialSeedData.materials.map(m => ({ ...m, _id: undefined }));
      await StudyMaterial.insertMany(materials, { ordered: false });
      console.log(`✅ Seeded ${materials.length} study materials`);
    }

    console.log('\n🎉 Atlas database seeded successfully!');
    console.log('   Your LearnNova app now has real data in MongoDB Atlas.');
  } catch (err) {
    console.error('❌ Seeding failed:', err.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from Atlas.');
  }
}

seed();
