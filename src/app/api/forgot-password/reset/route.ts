import { NextResponse } from "next/server";
import { prisma } from "@/libs/prismaDB";
import crypto from "crypto";
import { sendEmail } from "@/libs/email"; // Adjust import to match your project

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ message: "Email does not exist" }, { status: 404 });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");

    const passwordResetTokenExp = new Date();
    passwordResetTokenExp.setHours(passwordResetTokenExp.getHours() + 1);

    await prisma.user.update({
      where: { email },
      data: { passwordResetToken: resetToken, passwordResetTokenExp },
    });

    const resetURL = `${process.env.SITE_URL}/auth/reset-password/${resetToken}`;

    await sendEmail({
      to: email,
      subject: "Reset your password",
      html: `
        <div>
          <h1>You requested a password reset</h1>
          <p>Click the link below to reset your password</p>
          <a href="${resetURL}" target="_blank">Reset Password</a>
        </div>
      `,
    });

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}