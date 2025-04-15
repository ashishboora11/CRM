import { Contact } from "@/database/model/contacts";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

  //////////////////////////   get contacts        ////////////////////////

export async function GET() {
  try {
    await mongoose.connect(`${process.env.NEXT_PUBLIC_CONNECTIONSDB}`);
    const data = await Contact.find();
    return NextResponse.json({ result: true, response: data }, { status: 200 });
  } catch (error: any) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { result: false, message: "Failed to fetch contacts", error: error.message },
      { status: 500 }
    );
  }
}

  //////////////////////////  add contacts       ////////////////////////

export async function POST(req: any) {
  try {
    const payload = await req.json();
    await mongoose.connect(`${process.env.NEXT_PUBLIC_CONNECTIONSDB}`);
    const existingUser = await Contact.findOne({ Email_Address: payload.Email_Address });
    if (existingUser) {
      return NextResponse.json(
        {result: false, message: "Email Already Exists." },
        { status: 400 }
      );
    }
    const contact = new Contact(payload);
    const data = await contact.save();
    return NextResponse.json({ result: true, response: data }, { status: 201 });
  } catch (error: any) {
    console.error("POST Error:", error);
    return NextResponse.json(
      { result: false, message: "Failed to save contact", error: error.message },
      { status: 500 }
    );
  }
}
