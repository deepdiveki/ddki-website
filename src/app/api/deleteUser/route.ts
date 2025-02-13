// pages/api/deleteUser.ts
import { prisma } from "@/libs/prismaDB";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { email } = body; // oder nutze die User-ID, falls vorhanden

    if (!email) {
      return new NextResponse("Missing email", { status: 400 });
    }

    const deletedUser = await prisma.user.delete({
      where: { email },
    });

    return NextResponse.json({ message: "Der Account wurde erfolgreich gelöscht", deletedUser });
  } catch (error) {
    console.error("Error deleting user:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
