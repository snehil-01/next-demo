import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

export async function connectDB() {
  try {
    const connectionInstance = await mongoose.connect(
        `${process.env.MONGO_URII}/${DB_NAME}`
      );
      console.log(
        ` Successfully connected to MONGO host: ${connectionInstance.connection.host}`
      );
  } catch (error) {
    console.log("something went wring in connecting with db...");
    console.log(error);
    throw error
  }
}
