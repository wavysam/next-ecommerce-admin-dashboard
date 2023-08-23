import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { categoryId: string } }
) {
  const body = await request.json();
  const { categoryId } = params;
  const { name } = body;
  try {
    const category = await prisma.category.update({
      where: {
        id: categoryId,
      },
      data: {
        name,
      },
    });
    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { categoryId: string } }
) {
  const { categoryId } = params;
  try {
    const category = await prisma.category.delete({
      where: {
        id: categoryId,
      },
    });
    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
