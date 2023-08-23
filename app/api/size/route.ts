import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, value } = body;
  try {
    const size = await prisma.size.create({
      data: {
        name,
        value,
      },
    });
    return NextResponse.json(size, { status: 201 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
