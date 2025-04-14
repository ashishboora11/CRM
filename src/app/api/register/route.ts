import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { User } from "@/database/model/contacts";
import bcrypt from "bcryptjs";
export async function POST(req: any) {
  try {
    const { name, email, password } = await req.json();
    const hidepassword = await bcrypt.hash(password , 10)
    await mongoose.connect(`${process.env.NEXT_PUBLIC_CONNECTIONSDB}`);
    await User.create({ name, email, password:hidepassword});
    return NextResponse.json({ message: "user register" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "user not register" }, { status: 500 });
  }
}
