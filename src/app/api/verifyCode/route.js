


// import { User } from "@/models/usermodels";
// import dbConnect from "@/utils/dbConnect";

// export default async function handler(req, res) {
//     await dbConnect();

//     if (req.method === "POST") {
//         const { email, code } = req.body;

//         try {
//             const user = await User.findOne({ email });
//             if (!user) {
//                 return res.status(404).json({ message: "User not found" });
//             }

//             const userCode = user.codes.find(c => c.code === code);
//             if (!userCode) {
//                 return res.status(400).json({ message: "Invalid code" });
//             }

//             if (userCode.verified) {
//                 return res.status(400).json({ message: "Code already verified" });
//             }

//             userCode.verified = true;
//             await user.save();

//             res.status(200).json({ message: "Code verified successfully" });
//         } catch (error) {
//             res.status(500).json({ message: "Error verifying code", error });
//         }
//     } else {
//         res.status(405).json({ message: "Method not allowed" });
//     }
// }


import { NextResponse } from "next/server";
// import { User } from "@/models/usermodels";
import User from "@/app/models/userModels";
// import dbConnect from "@/utils/dbConnect";
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
