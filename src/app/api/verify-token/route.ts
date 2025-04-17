import { User } from "@/database/model/contacts";
import crypto from "crypto";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

  //////////////////////////   verify token valid or not        ////////////////////////

export async function POST(req: any) {
  try {
    const { token } = await req.json();
    await mongoose.connect(`${process.env.MONGODB_URI}`);
    const hashtoken = crypto.createHash("sha256").update(token).digest("hex");
    const usertoken = await User.findOne({
      resetToken: hashtoken,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!usertoken) {
      return NextResponse.json(
        { message: "Invalid token or has expired" },
        { status: 400 }
      );
    }

    return NextResponse.json({ message: usertoken }, { status: 200 });
  } catch (error) {
    console.error("forget password error:", error);
    return NextResponse.json(
      { message: "An error occurred during forget password." },
      { status: 500 }
    );
  }
}
