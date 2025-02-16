import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Fetch users from the database
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true
      }
    });

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
