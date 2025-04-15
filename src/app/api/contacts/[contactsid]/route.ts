import { Contact } from "@/database/model/contacts";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

  //////////////////////////   get one contacts        ////////////////////////

export async function GET(req: any, res: any) {
  try {
    await mongoose.connect(`${process.env.NEXT_PUBLIC_CONNECTIONSDB}`);
      const data = await Contact.findById( res.params.contactsid);      
    return NextResponse.json({ result: true, response: data }, { status: 200 });
  } catch (error: any) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { result: false, message: "Failed to fetch contacts", error: error.message },
      { status: 500 }
    );
  }
}

  //////////////////////////   update contacts        ////////////////////////

export async function PATCH(req: any, res: any) {
     const payload = await req.json();
  try {
    await mongoose.connect(`${process.env.NEXT_PUBLIC_CONNECTIONSDB}`);
      const data = await Contact.findByIdAndUpdate( res.params.contactsid , {...payload , _id:res.params.contactsid});      
    return NextResponse.json({ result: true, response: data }, { status: 200 });
  } catch (error: any) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { result: false, message: "Failed to fetch contacts", error: error.message },
      { status: 500 }
    );
  }
}

  //////////////////////////   delete contacts        ////////////////////////

export async function DELETE(req: any, res: any) {
  try {
    await mongoose.connect(`${process.env.NEXT_PUBLIC_CONNECTIONSDB}`);
      const data = await Contact.findByIdAndDelete( res.params.contactsid);      
    return NextResponse.json({ result: true, response: data }, { status: 200 });
  } catch (error: any) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { result: false, message: "Failed to fetch contacts", error: error.message },
      { status: 500 }
    );
  }
}