import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { sizeId: string } }
) {
  const body = await request.json();
  const { name, value } = body;
  const { sizeId } = params;
  try {
    const size = await prisma.size.update({
      where: {
        id: sizeId,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(size, { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { sizeId: string } }
) {
  const { sizeId } = params;
  try {
    const size = await prisma.size.delete({
      where: {
        id: sizeId,
      },
    });
    return NextResponse.json(size, { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
