



import { connectDB } from "@/utils/dbConnect";
import User from "../../models/usermodels";
// import { Resend } from "resend";
import { NextResponse } from "next/server"; // Import NextResponse
const nodemailer = require('nodemailer');

connectDB();


export async function POST(req) {
    try {
        const { email, count } = await req.json();
        console.log("Email:", email, "Count:", count);

        // Validate email and count
        if (!email || !count) {
            return NextResponse.json({ message: "Email and count are required" }, { status: 400 });
        }

        // Find the user in the database
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // Generate the verification codes
        const codes = [];
        for (let i = 0; i < count; i++) {
            const code = Math.random().toString(36).substr(2, 6).toUpperCase();
            codes.push({ code, verified: false });
        }

        // Save the codes to the user
        user.codes.push(...codes);
        await user.save();

        // Send email using Resend API
        try {
            // const response = await resend.emails.send({
            //     from: "harkalgovind21@gmail.com",
            //     to: email,
            //     subject: "Your Generated Codes",
            //     html: `<p>Hello ${user.name},</p><p>Here are your verification codes:</p><ul>${codes.map(code => `<li>${code.code}</li>`).join("")}</ul><p>Thank you!</p>`,
            // });
            // Nodemailer transporter setup
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.GMAIL_USER, // Your Gmail address (set in the .env file)
                    pass: "kgxh aait axqm eutu", // App-specific password (set in the .env file)
                },
            });
            console.log(transporter, 'transporter');

            // Email details
            const mailOptions = {
                from: process.env.GMAIL_USER, // Sender address
                to: email, // Recipient address
                subject: "Your Generated Codes",
                html: `
                <p>Hello ${user.name},</p>
                <p>Here are your verification codes:</p>
                <ul>${codes.map(code => `<li>${code.code}</li>`).join("")}</ul>
                <p>Thank you!</p>
                `,
            };

            console.log(mailOptions, 'mailOptions');
            // Send the email
            const response = await transporter.sendMail(mailOptions);
            // console.log("Email sent successfully");
            console.log("Email sent successfully:", response);

            // Return the success response after email is sent
            return NextResponse.json({
                message: "Codes generated and sent successfully",
                codes,
                count,
            }, { status: 200 });

        } catch (emailError) {
            console.error("Error sending email:", emailError);
            return NextResponse.json({ message: "Error sending email", error: emailError.message }, { status: 500 });
        }

    } catch (error) {
        console.error("Error generating codes:", error);
        return NextResponse.json({ message: "Error generating codes", error: error.message }, { status: 500 });
    }
}
