import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import Admin from "@/app/models/adminModels";
import { connectDB } from "@/utils/dbConnect";

connectDB();

export async function POST(req) {
    try {
        console.log("MongoDB connected");

        const { email, password } = await req.json();
        console.log("Incoming request body:", { email, password });

        // Step 1: Check if the admin exists
        const admin = await Admin.findOne({ email });
        console.log("Step 2: Query result:", admin);

        if (!admin) {
            return NextResponse.json({ message: "Admin not found" }, { status: 401 });
        }

        // Step 2: Verify the password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return NextResponse.json({ message: "Invalid password" }, { status: 401 });
        }

        // Step 3: Generate JWT token
        const token = jwt.sign(
            { id: admin._id, email: admin.email },
            process.env.JWT_SECRET,
            { expiresIn: "48h" }
        );

        // Step 4: Set token as a cookie
        const response = NextResponse.json(
            {
                message: "Admin authenticated successfully",
                admin: {
                    id: admin._id,
                    email: admin.email,
                    firstName: admin.firstName,
                    lastName: admin.lastName,
                    phone: admin.phone,
                },
                token,
            },
            { status: 200 }
        );

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            path: "/",
            maxAge: 48 * 60 * 60, // 48 hours
        });

        return response;

    } catch (error) {
        console.error("Error during admin login:", error);

        return NextResponse.json(
            { message: "Internal server error", error: error.message },
            { status: 500 }
        );
    }
}
