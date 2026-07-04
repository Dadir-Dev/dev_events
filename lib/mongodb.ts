import mongoose from 'mongoose';

// 1. Retrieve the MongoDB URI from environment variables.
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

// 2. Define the TypeScript interface for our cached connection structure.
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// 3. Extend the global scope to preserve the cache across hot-reloads during development.
// This prevents multiple connection pools from being initialized simultaneously.
declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

// 4. Retrieve the cached connection if it exists, or initialize it.
if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null };
}

const cached: MongooseCache = global.mongoose;

/**
 * Connects to MongoDB using Mongoose and caches the connection to prevent duplicate connections.
 * @returns {Promise<typeof mongoose>} The Mongoose connection instance.
 */
async function dbConnect(): Promise<typeof mongoose> {
  // If a connection is already established, return it immediately
  if (cached.conn) {
    return cached.conn;
  }

  // If no connection promise is currently active, initialize one
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    // Initialize the mongoose connection with options. MONGODB_URI is asserted as non-null
    // because its presence was validated at the module scope on initialization.
    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  try {
    // Await the connection promise and store the resolved connection
    cached.conn = await cached.promise;
  } catch (error) {
    // If connection fails, clear the cached promise so next attempts can try again
    cached.promise = null;
    throw error;
  }

  // Double check that connection is set
  if (!cached.conn) {
    throw new Error('Mongoose connection could not be established.');
  }

  return cached.conn;
}

export default dbConnect;

