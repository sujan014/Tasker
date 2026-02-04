import _mongoose, { connect } from 'mongoose';
import { debug } from 'util';

declare global {
  interface GlobalMongoose {
    promise: Promise<typeof _mongoose> | null;
    conn: typeof _mongoose | null;
  }

  // eslint-disable-next-line no-var
  var mongoose: GlobalMongoose; // Declare mongoose as a global variable
}

const MONGODB_URI = `${process.env.MONGODB_URI}/${process.env.MONGODB_DB_MAIN}`;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

// Use globalThis for compatibility across environments
let cached = globalThis.mongoose;

if (!cached) {
  cached = globalThis.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    console.log('Using cached connection');
    debug('🚀 Using cached connection');
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    // Explicitly type the promise to avoid TypeScript error
    cached.promise = (async () => {
      try {
        const mongoose = await connect(MONGODB_URI, opts);
        console.log('✅ New connection established');
        return mongoose as typeof _mongoose; //explicitly cast to typeof _mongoose
      } catch (error) {
        console.error('❌ Connection to database failed');
        throw error;
      }
    })();
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
  return cached.conn;
}

export default dbConnect;
