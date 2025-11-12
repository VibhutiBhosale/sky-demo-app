import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User"; // Your Mongoose model

export async function POST(req: Request) {
  try {
    const { identifier } = await req.json();
    if (!identifier) {
      return NextResponse.json({ success: false, message: "Missing identifier" }, { status: 400 });
    }

    await dbConnect();

    // Check for user by email OR username
    const user = await User.findOne({
      $or: [{ email: identifier.toLowerCase() }, { username: identifier }],
    });

    if (user) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "USER_NOT_FOUND",
            message: "We can't find an account matching that email or username.",
          },
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
