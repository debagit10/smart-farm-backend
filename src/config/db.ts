import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connect = await mongoose.connect(String(process.env.MONGO_URI));

    console.log(`MongoDB connected: ${connect.connection.host}`);
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
