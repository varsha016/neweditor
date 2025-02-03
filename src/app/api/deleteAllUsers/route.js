import { connectDB } from "@/utils/dbConnect";
import User from "@/app/models/userModels"; // Correct path to your model
import { NextResponse } from "next/server"; // Import NextResponse

connectDB();

export async function DELETE() {
    try {
        // Delete all users from the database
        const result = await User.deleteMany({});

        if (result.deletedCount === 0) {
            return NextResponse.json({ message: "No users found to delete" }, { status: 404 });
        }

        console.log(`All users deleted successfully. Total: ${result.deletedCount}`);

        return NextResponse.json({ message: `All users deleted successfully. Total: ${result.deletedCount}` }, { status: 200 });
    } catch (error) {
        console.error("Error during deleting all users:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
