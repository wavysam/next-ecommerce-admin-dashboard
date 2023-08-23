import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name } = body;
  try {
    const category = await prisma.category.create({
      data: {
        name,
      },
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
