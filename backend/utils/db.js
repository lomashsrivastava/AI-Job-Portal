import mongoose from "mongoose";

const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            console.error("ERROR: MONGO_URI is not defined in environment variables.");
            // Do not exit, just log ensures server stays up for health check
            return;
        }
        await mongoose.connect(process.env.MONGO_URI);
        console.log('mongodb connected successfully');
    } catch (error) {
        console.error("MongoDB Connection Failed:", error);
    }
}
export default connectDB;