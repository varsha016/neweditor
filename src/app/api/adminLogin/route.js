


import jwt from "jsonwebtoken";

import { NextResponse } from "next/server";

import mongoose from "mongoose";
import Admin from "@/app/models/adminModels"; // Admin model import
import { connectDB } from "@/utils/dbConnect"; // Database connection
// import jwt from "jsonwebtoken"; // Don't forget to import jwt

connectDB();

export async function POST(req) {
    try {
        console.log("MongoDB connected");

        const { email, password } = await req.json();
        console.log("Incoming request body:", { email, password });

        // Step 1: Check if the admin already exists
        let admin = await Admin.findOne({ email });
        console.log("Step 2: Query result:", admin);

        // if (!admin) {
        //     // Step 3: If admin doesn't exist, create a new one
        //     console.log("Step 3: Admin not found, creating a new admin");

        //     admin = new Admin({ email, password });
        //     await admin.save(); // Save the new admin
        //     console.log("New admin created:", admin);
        // }

        // Step 4: Generate JWT token
        const token = jwt.sign(
            { id: admin._id, email: admin.email },
            process.env.JWT_SECRET,
            { expiresIn: "48h" }
        );

        // Return the response using NextResponse
        return NextResponse.json({
            message: "Admin found or created successfully",
            admin,
            token,
        }, { status: 200 });

    } catch (error) {
        console.error("Error during admin operation:", error);

        // Return the error response
        return NextResponse.json(
            { message: "Internal server error", error: error.message },
            { status: 500 }
        );
    }
}

