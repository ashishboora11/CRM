import { User } from "@/database/model/contacts";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

//////////////////////////   change password       ////////////////////////

export async function POST(req: any) {
  const { password, email } = await req.json();
  await mongoose.connect(`${process.env.NEXT_PUBLIC_CONNECTIONSDB}`);

  const existinguser = await User.findOne({ email });
  const hashedPassword = await bcrypt.hash(password, 10);
  existinguser.password = hashedPassword;
  existinguser.resetToken = undefined;
  existinguser.resetTokenExpiry = undefined;

  try {
    await existinguser.save();
    return NextResponse.json(
      { message: "User's password is updated" },
      { status: 200 }
    );
  } catch (error) {
    console.error("change password error:", error);
    return NextResponse.json(
      { message: "An error occurred during change password." },
      { status: 500 }
    );
  }
}
