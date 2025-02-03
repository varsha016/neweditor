import { connectDB } from "@/utils/dbConnect";
import User from "../../models/usermodels";
import { NextResponse } from "next/server"; // Import NextResponse

connectDB();

export async function DELETE(req) {
    try {
        // Parse the incoming JSON body from the request
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ message: "Email is required" }, { status: 400 });
        }

        // Find and delete the user by email
        const deletedUser = await User.findOneAndDelete({ email });

        if (!deletedUser) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        console.log(`User deleted successfully: ${deletedUser.email}`);

        return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error during user deletion:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
