import { MongoClient } from 'mongodb';

const dbName = 'Estate-Data';
let db_1;

export const connectDB = async () => {
  try {
    const client = new MongoClient('mongodb://localhost:27017');
    await client.connect();
    console.log('Connected to MongoDB! !!!!!');
    db_1 = client.db(dbName);
  } catch (error) {
    console.error('Database connection error:', error.message);
    throw error;
  }
};

export const getDb = (collectionName) => {
  if (!db_1) {
    console.error('Database not connected! Call connectDB first.');
    return;
  }
  console.log(db_1);
  return db_1.collection(collectionName);
};
