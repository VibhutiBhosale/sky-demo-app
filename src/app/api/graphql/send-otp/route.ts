import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // generate mock OTP (for dev)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Normally, you'd trigger an email/SMS here.
    console.log(`OTP for ${email}: ${otp}`);

    return NextResponse.json({
      data: {
        sendOtp: {
          success: true,
          message: "OTP sent successfully",
          otp, // we’ll use this to display on screen in dev
        },
      },
    });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return NextResponse.json({ errors: [{ message: "Failed to send OTP" }] }, { status: 500 });
  }
}
