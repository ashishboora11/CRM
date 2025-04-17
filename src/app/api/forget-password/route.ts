import { User } from "@/database/model/contacts";
import crypto from "crypto";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

  //////////////////////////   forget password send verfication        ////////////////////////

export async function POST(req: any) {
  try {
    const { email } = await req.json();

    await mongoose.connect(`${process.env.NEXT_PUBLIC_CONNECTIONSDB}`);

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return NextResponse.json(
        { message: "This email is not registered." },
        { status: 400 }
      );
    }

    // Generate reset token and expiry
    const resttoken = crypto.randomBytes(20).toString("hex");
    const resttokenpassword = crypto
      .createHash("sha256")
      .update(resttoken)
      .digest("hex");
    const passwordresttokenexpire = Date.now() + 3600000; // 1 hour
    existingUser.resetToken = resttokenpassword;
    existingUser.resetTokenExpiry = passwordresttokenexpire;
    await existingUser.save();

  //////////////////////////   send gmail verfication        ////////////////////////

    const reseturl = `/reset-password/${resttoken}`;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NEXT_PUBLIC_EMAIL_USER,
        pass: process.env.NEXT_PUBLIC_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"CRM" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Reset Your Password",
      html: `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
      <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <h2 style="color: #333;">Reset Your Password</h2>
        <p style="font-size: 16px; color: #555;">
          You requested a password reset. Click the button below to reset your password. 
          This link will expire in <strong>1 hour</strong>.
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${reseturl}" target="_blank" rel="noopener noreferrer" 
            style="background-color: #E77A3F; color: white; padding: 12px 24px; text-decoration: none; font-size: 16px; border-radius: 6px;">
            Reset Password
          </a>
        </div>
        <p style="font-size: 14px; color: #999;">
          If you did not request this, please ignore this email.
        </p>
      </div>
    </div>
  `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Password reset email sent." },
      { status: 200 }
    );
  } catch (error) {
    console.error("forget password error:", error);
    return NextResponse.json(
      { message: "An error occurred during forget password." },
      { status: 500 }
    );
  }
}
