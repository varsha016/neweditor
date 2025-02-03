
const mongoose = require("mongoose");
// require("dotenv").config();
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

export const connectDB = async (retries = 5, delay = 5000) => {
    try {
        if (mongoose.connections[0].readyState) {
            return; // Already connected
        }

        console.log("Attempting to connect to MongoDB...");
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://your-mongodb-uri', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("MongoDB connected");
    } catch (err) {
        console.error("MongoDB connection error:", err);
        if (retries > 0) {
            console.log(`Retrying connection in ${delay / 1000} seconds...`);
            await new Promise(resolve => setTimeout(resolve, delay));
            return connectDB(retries - 1, delay); // Retry connecting
        } else {
            console.error("Failed to connect to MongoDB after multiple attempts.");
            throw new Error("MongoDB connection failed");
        }
    }
};



