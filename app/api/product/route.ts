import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, price, categoryId, colorId, sizeId, isFeatured, images } = body;
  try {
    const product = await prisma.product.create({
      data: {
        name,
        price,
        categoryId,
        colorId,
        sizeId,
        isFeatured,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const product = await prisma.product.findMany({
      include: {
        category: true,
        size: true,
        color: true,
      },
    });

    return NextResponse.json(product, { status: 200 });
    // return NextResponse.json({
    //   name,
    //   price,
    //   categoryId,
    //   colorId,
    //   sizeId,
    //   isFeatured,
    // });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
