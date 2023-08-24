import ProductForm from "@/components/forms/product-form";
import { Separator } from "@/components/ui/separator";
import { prisma } from "@/lib/prisma";

export default async function Page({
  params,
}: {
  params: { productId: string };
}) {
  const products = await prisma.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      category: true,
      color: true,
      size: true,
      images: true,
    },
  });

  const categories = await prisma.category.findMany();
  const sizes = await prisma.size.findMany();
  const colors = await prisma.color.findMany();

  return (
    <div className="py-12">
      <div className="mb-4">
        <h1 className="text-3xl font-bold">Update category</h1>
        <p className="opacity-80">Add a new category</p>
      </div>
      <Separator />
      <div className="mt-6">
        <ProductForm
          initialData={products}
          categories={categories}
          colors={colors}
          sizes={sizes}
        />
      </div>
    </div>
  );
}
