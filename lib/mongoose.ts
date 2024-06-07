import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) {
    return console.log("Missing MongoDb_Url");
  }
  if (isConnected) {
    return console.log("MongoDb is already connected");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "Devflow",
    });
    isConnected = true;
    console.log("MongoDb is connected");
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }
};
