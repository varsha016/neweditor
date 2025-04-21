import { connectDB } from "@/utils/dbConnect";
import User from "../../models/usermodels";

import { NextResponse } from "next/server"; // Import NextResponse

connectDB();

export async function DELETE(req) {
    try {
        const { email, code } = await req.json(); // Expecting email and code in the body

        // Validate input
        if (!email || !code) {
            return NextResponse.json({ message: "Email and code are required" }, { status: 400 });
        }

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // Remove the code from the user's list of codes
        const codeIndex = user.codes.findIndex(c => c.code === code);
        if (codeIndex === -1) {
            return NextResponse.json({ message: "Code not found" }, { status: 404 });
        }

        // Remove the code
        user.codes.splice(codeIndex, 1);
        await user.save();

        // Return success message
        return NextResponse.json({ message: "Code deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting code:", error);
        return NextResponse.json({ message: "Internal server error", error: error.message }, { status: 500 });
    }
}
