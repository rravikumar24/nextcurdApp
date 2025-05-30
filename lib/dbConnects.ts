import mongoose from "mongoose";
import { connectionUrl } from "./mongodb";


let isConnected = false;

export const dbConnect = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(connectionUrl, {
      bufferCommands: false,
    });
    isConnected = true;

    if (process.env.NODE_ENV === 'development') {
      console.log('✅ MongoDB connected');
    }
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw new Error('Failed to connect to MongoDB');
  }
};