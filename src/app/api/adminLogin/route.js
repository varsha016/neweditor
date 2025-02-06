


// import jwt from "jsonwebtoken";

// import { NextResponse } from "next/server";

// import mongoose from "mongoose";
// import Admin from "@/app/models/adminModels"; // Admin model import
// import { connectDB } from "@/utils/dbConnect"; // Database connection
// // import jwt from "jsonwebtoken"; // Don't forget to import jwt

// connectDB();

// export async function POST(req) {
//     try {
//         console.log("MongoDB connected");

//         const { email, password } = await req.json();
//         console.log("Incoming request body:", { email, password });

//         // Step 1: Check if the admin already exists
//         let admin = await Admin.findOne({ email });
//         console.log("Step 2: Query result:", admin);

//         // if (!admin) {
//         //     // Step 3: If admin doesn't exist, create a new one
//         //     console.log("Step 3: Admin not found, creating a new admin");

//         //     admin = new Admin({ email, password });
//         //     await admin.save(); // Save the new admin
//         //     console.log("New admin created:", admin);
//         // }

//         // Step 4: Generate JWT token
//         const token = jwt.sign(
//             { id: admin._id, email: admin.email },
//             process.env.JWT_SECRET,
//             { expiresIn: "48h" }
//         );

//         // Return the response using NextResponse
//         return NextResponse.json({
//             message: "Admin found or created successfully",
//             admin,
//             token,
//         }, { status: 200 });

//     } catch (error) {
//         console.error("Error during admin operation:", error);

//         // Return the error response
//         return NextResponse.json(
//             { message: "Internal server error", error: error.message },
//             { status: 500 }
//         );
//     }
// }

import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Admin from "@/app/models/adminModels";
import { connectDB } from "@/utils/dbConnect";

connectDB();

export async function POST(req) {
    try {
        console.log("MongoDB connected");

        const { email, password } = await req.json();
        console.log("Incoming request body:", { email, password });

        // Step 1: Check if the admin exists
        let admin = await Admin.findOne({ email });
        console.log("Step 2: Query result:", admin);

        if (!admin) {
            return NextResponse.json({ message: "Admin not found" }, { status: 401 });
        }
        // Verify password
        // const isMatch = await bcrypt.compare(password, admin.password);
        // if (!isMatch) {
        //     return NextResponse.json({ message: "Invalid password" }, { status: 401 });
        // }


        // Step 3: Generate JWT token
        const token = jwt.sign(
            { id: admin._id, email: admin.email },
            process.env.JWT_SECRET,
            { expiresIn: "48h" }
        );

        // Step 4: Set isVerified cookie
        const response = NextResponse.json(
            {
                message: "Admin authenticated successfully",
                admin,
                token,
            },
            { status: 200 }
        );

        // response.cookies.set("isVerified", "true", {
        //     httpOnly: true, // More secure (prevents JavaScript access)
        //     secure: true,   // Ensures HTTPS usage
        //     sameSite: "strict", // Prevents CSRF attacks
        //     path: "/",
        //     // maxAge: 48 * 60 * 60, // Cookie expires in 48 hours
        // });
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            path: "/",
            // maxAge: 60, // 1 minute in seconds
            maxAge: 48 * 60 * 60,
        });

        return response;

    } catch (error) {
        console.error("Error during admin operation:", error);

        return NextResponse.json(
            { message: "Internal server error", error: error.message },
            { status: 500 }
        );
    }
}
