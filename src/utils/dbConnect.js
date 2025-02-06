
const mongoose = require("mongoose");
// require("dotenv").config();
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import Admin from "@/app/models/adminModels";
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
        // ***********************************8
        // Check if an admin exists
        // const adminExists = await Admin.findOne({ email: "vharkal16@gmail.com" });

        // if (!adminExists) {
        //     // Hash the default password
        //     const hashedPassword = await bcrypt.hash("123", 10);

        //     // Create default admin
        //     await Admin.create({
        //         email: "vharkal16@gmail.com",
        //         password: hashedPassword,
        //     });

        //     console.log("Default admin created with email: vharkal16@gmail.com and password: 123");
        // }
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



