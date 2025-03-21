import { prisma } from "@/libs/prismaDB";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import crypto from "crypto";
import { sendEmail } from "@/libs/email";

async function createVerificationToken(userEmail: string) {
  const token = crypto.randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 3600000); // expires in 1 hour

  await prisma.verificationToken.create({
    data: {
      identifier: userEmail,
      token,
      expires,
    },
  });
  return token;
}

export async function POST(request: any) {
    try {
  const body = await request.json();
  const { name, email, password } = body;

  if (!name || !email || !password) {
    return new NextResponse("Missing Fields", { status: 400 });
  }

  const exist = await prisma.user.findUnique({
    where: { email },
  });

  if (exist) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  let access = "standard"; //changed for testing in Celle -> change back to website asap

  const adminEmails = ["philipp@deepdive-ki.de"]; // List of admin emails
    if (adminEmails.includes(email.toLowerCase())) {
      access = "admin";
    }

  const verifiedEmails = ["timphilipp@live.de", "info@deepdive-ki.de", "katrin.wenzel@bsb.hamburg.de"]; // List of verified emails
    if (verifiedEmails.includes(email.toLowerCase())) {
      access = "standard";
    }

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      access,
    },
  });

    // Generate verification token and send the email
    const token = await createVerificationToken(email);
    const verificationUrl = `https://deepdive-ki.de/api/verify?token=${token}&identifier=${encodeURIComponent(email)}`;

    await sendEmail({
      to: email,
      subject: "Verifizieren Sie Ihren Account",
      html: `<p>Verifizieren Sie jetzt Ihren Account bei DeepDiveKI, indem Sie auf diesen Link klicken: </p>
<p><a href="${verificationUrl}">${verificationUrl}</a></p>`,
    });

    await sendEmail({
      to: "info@deepdive-ki.de",
      subject: "Neuer User bei DDKI",
      html: `<p>Name: ${name} <br> Email: ${email} </p>`,
    });

    // Exclude password before sending response
    const { password: _, ...userWithoutPassword } = user;
    return NextResponse.json(
      {
        message: "User registered and verification email sent",
        user: userWithoutPassword,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during signup:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
