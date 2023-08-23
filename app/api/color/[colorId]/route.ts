import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: {
    colorId: string;
  };
}

export async function PATCH(request: NextRequest, { params }: Props) {
  const body = await request.json();
  const { name, value } = body;
  const { colorId } = params;
  try {
    const color = await prisma.color.update({
      where: {
        id: colorId,
      },
      data: {
        name,
        value,
      },
    });
    return NextResponse.json(color, { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const { colorId } = params;
  try {
    const color = await prisma.color.delete({
      where: {
        id: colorId,
      },
    });
    return NextResponse.json(color, { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
