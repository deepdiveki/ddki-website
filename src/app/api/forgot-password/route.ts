import bcrypt from "bcryptjs";
import { prisma } from "@/libs/prismaDB";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { sendEmail } from "@/libs/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ message: "Missing Fields" }, { status: 400 });
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
      data: {
        passwordResetToken: resetToken,
        passwordResetTokenExp,
      },
    });

    const resetURL = `${process.env.SITE_URL}/auth/reset-password/${resetToken}`;

    // Send email using the external function
    await sendEmail({
      to: email,
      subject: "Password Reset",
      html: `<p>Click <a href="${resetURL}">here</a> to reset your password.</p>`,
    });

    return NextResponse.json({ message: "An email has been sent to your email" }, {
        status: 200,
    });
  } catch (error: any) {
    console.error("Error in password reset handler:", error);
    return NextResponse.json({ message: "An error has occurred. Please try again!" }, {
      status: 500,
    });
  }
}

