




import { NextResponse } from "next/server";

import User from "../../models/usermodels";
import { connectDB } from "@/utils/dbConnect";

// Call dbConnect outside the handler
connectDB(); // Establish the database connection once

export async function POST(req) {
    try {
        const { email, code } = await req.json();

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // Check if the provided code matches and is not already verified
        const userCode = user.codes.find((c) => c.code === code);
        if (!userCode) {
            return NextResponse.json({ message: "Invalid code" }, { status: 400 });
        }

        if (userCode.verified) {
            return NextResponse.json({ message: "Code already verified" }, { status: 400 });
        }

        // Mark the code as verified
        userCode.verified = true;
        await user.save();

        return NextResponse.json({ message: "Code verified successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error verifying code:", error);
        return NextResponse.json(
            { message: "Error verifying code", error: error.message },
            { status: 500 }
        );
    }
}
