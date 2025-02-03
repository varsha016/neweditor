import bcrypt from "bcryptjs";
import { connectDB } from "@/utils/dbConnect";
import User from "../../models/usermodels";
import { NextResponse } from "next/server";

connectDB();

export async function POST(req) {
    try {
        // Parse the incoming JSON body from the request
        const { name, email, mobile, password } = await req.json();

        console.log("Incoming request body:", { name, email, mobile, password });

        // Validate input
        if (!name || !email || !mobile || !password) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log(`User already exists for email: ${email}`);
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        }

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            name,
            email,
            mobile,
            password: hashedPassword,
        });

        // Save the user to the database
        await newUser.save();

        console.log("User added successfully:", newUser);

        return NextResponse.json({ message: "User added successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error during user creation:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
