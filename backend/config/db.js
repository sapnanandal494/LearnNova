import mongoose from 'mongoose';

export let isDbConnected = false;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/learnnova';

  // Detect if still using placeholder
  if (uri.includes('<db_username>') || uri.includes('<db_password>')) {
    console.warn('[MongoDB] ⚠️  MONGODB_URI contains placeholder values. Update backend/.env with real Atlas credentials.');
    console.warn('[MongoDB] Operating in in-memory mode with full seed data.');
    isDbConnected = false;
    return false;
  }

  // Append database name if not already in URI
  const finalUri = uri.includes('/learnnova') ? uri : uri.replace('mongodb.net/', 'mongodb.net/learnnova').replace('mongodb.net/?', 'mongodb.net/learnnova?');

  try {
    const conn = await mongoose.connect(finalUri, {
      serverSelectionTimeoutMS: 10000,  // 10s — Atlas needs more time than local
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
      retryWrites: true,
      w: 'majority',
    });

    isDbConnected = true;
    console.log(`[MongoDB] ✅ Connected to Atlas: ${conn.connection.host}`);
    console.log(`[MongoDB] 📦 Database: ${conn.connection.name}`);

    // Handle disconnection events
    mongoose.connection.on('disconnected', () => {
      console.warn('[MongoDB] ⚠️  Disconnected from Atlas. Retrying...');
      isDbConnected = false;
    });
    mongoose.connection.on('reconnected', () => {
      console.log('[MongoDB] ✅ Reconnected to Atlas.');
      isDbConnected = true;
    });
    mongoose.connection.on('error', (err) => {
      console.error('[MongoDB] Connection error:', err.message);
    });

    return true;
  } catch (error) {
    isDbConnected = false;

    // Always log raw error for debugging
    console.error(`[MongoDB] 🔍 RAW ERROR: ${error.message}`);

    // Friendly error messages for common Atlas errors
    if (error.message?.includes('Authentication failed') || error.message?.includes('bad auth')) {
      console.error('[MongoDB] ❌ Authentication failed — check your username and password in MONGODB_URI.');
    } else if (error.message?.includes('ENOTFOUND') || error.message?.includes('getaddrinfo')) {
      console.error('[MongoDB] ❌ Could not reach Atlas cluster — check your cluster hostname in MONGODB_URI.');
    } else if (error.message?.includes('IP') || error.message?.includes('whitelist') || error.message?.includes('not allowed')) {
      console.error('[MongoDB] ❌ Your IP is not whitelisted — go to Atlas → Network Access → Add IP Address → Allow from Anywhere (0.0.0.0/0).');
    } else if (error.message?.includes('timed out') || error.message?.includes('ETIMEDOUT')) {
      console.error('[MongoDB] ❌ Connection timed out — check Network Access in Atlas (allow 0.0.0.0/0) or your internet connection.');
    } else {
      console.error(`[MongoDB] ❌ Connection failed: ${error.message}`);
      console.error(`[MongoDB] 🔍 Full error:`, JSON.stringify({ name: error.name, code: error.code, codeName: error.codeName }, null, 2));
    }

    console.warn('[MongoDB] ⚡ Falling back to in-memory mode with full seed data. All features remain functional.');
    return false;
  }
};
