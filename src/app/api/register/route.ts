import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { User } from "@/database/model/contacts";
import bcrypt from "bcryptjs";

  //////////////////////////   register       ////////////////////////

export async function POST(req: any) {
  try {
    const { name, email, password } = await req.json();
    await mongoose.connect(`${process.env.MONGODB_URI}`);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "Account with this email already exists." },
        { status: 400 }
      );
    }
    const hidepassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hidepassword });
    return NextResponse.json(
      { message: "User registered successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "An error occurred during registration." },
      { status: 500 }
    );
  }
}
