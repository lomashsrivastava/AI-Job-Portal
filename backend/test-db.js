
import mongoose from "mongoose";

// PASTE YOUR RENDER CONNECTION STRING HERE MANUALLY BEFORE RUNNING
const MONGO_URI = "mongodb+srv://admin:Lomash12345@cluster0.yackxsl.mongodb.net/?appName=Cluster0";

const testConnection = async () => {
    console.log("Testing MongoDB Connection...");
    try {
        await mongoose.connect(MONGO_URI);
        console.log("✅ SUCCESS! Connected to MongoDB Atlas.");
        process.exit(0);
    } catch (error) {
        console.error("❌ FAILED to connect!");
        console.error(error);
        process.exit(1);
    }
};

testConnection();
