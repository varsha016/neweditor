import { connectDB } from "@/utils/dbConnect";
import User from "@/app/models/userModels"; // Correct path to your model
import { NextResponse } from "next/server"; // Import NextResponse

connectDB();

export async function GET() {
    try {
        // Fetch all users from the database
        const users = await User.find({});

        if (!users || users.length === 0) {
            return NextResponse.json({ message: "No users found" }, { status: 404 });
        }

        console.log("All users fetched successfully:", users.length);

        // Return the list of users
        return NextResponse.json({ users }, { status: 200 });
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
