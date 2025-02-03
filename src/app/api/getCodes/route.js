import { connectDB } from "@/utils/dbConnect";
import User from "@/app/models/userModels"; // Correct path to your model
import { NextResponse } from "next/server"; // Import NextResponse

connectDB();

export async function GET(req) {
    try {
        const { email } = req.query; // Get email from query parameters

        // Validate email
        if (!email) {
            return NextResponse.json({ message: "Email is required" }, { status: 400 });
        }

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // Retrieve the user's verification codes
        const codes = user.codes;
        if (!codes || codes.length === 0) {
            return NextResponse.json({ message: "No codes found for this user" }, { status: 404 });
        }

        // Return the codes
        return NextResponse.json({ codes }, { status: 200 });
    } catch (error) {
        console.error("Error fetching codes:", error);
        return NextResponse.json({ message: "Internal server error", error: error.message }, { status: 500 });
    }
}
