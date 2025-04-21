import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/utils/dbConnect";


import Admin from "@/app/models/adminModels"; // Import the Admin model

connectDB(); // Ensure the database connection is established

export async function POST(request) {
    try {
        const body = await request.json();
        const { firstName, lastName, phone, email, password } = body;

        // Validate input
        if (!firstName || !lastName || !phone || !email || !password) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }

        // Check if the email already exists in the database
        const existingUser = await Admin.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: "Email already exists" }, { status: 400 });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save the admin to the database
        const newAdmin = new Admin({
            firstName,
            lastName,
            phone,
            email,
            password: hashedPassword,
            createdAt: new Date(),
        });

        await newAdmin.save();

        return NextResponse.json({ message: "Admin registered successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error in admin signup:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}