import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, value } = body;
  try {
    const color = await prisma.color.create({
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(color, { status: 201 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
