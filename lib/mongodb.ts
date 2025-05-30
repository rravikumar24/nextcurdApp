// import mongoose from "mongoose";

// const MONGO_URI = process.env.MONGO_URI as string;

// const connectDB = async () => {
//   if (mongoose.connections[0].readyState) {
//     return;
//   }
//   try {
//     await mongoose.connect(MONGO_URI);
//     console.log("✅ MongoDB Connected");
//   } catch (error) {
//     console.error("MongoDB Connection Error:", error);
//   }
// };

// console.log("MongoDB Connection State:", mongoose.connection.readyState);

// export default connectDB;


// lib/mongodb.ts

const { password, user_name } = process.env;

if (!password || !user_name) {
  throw new Error("Missing required MongoDB credentials (user_name or password).");
}

const dbName = "user";

export const connectionUrl = `mongodb+srv://${encodeURIComponent(user_name)}:${encodeURIComponent(password)}@cluster0.cdrkjq1.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`;

// Optional: only log in development mode
if (process.env.NODE_ENV === 'development') {
  console.log('✅ MongoDB Connection URL (sanitized):', connectionUrl.replace(password, '*****'));
}

