import ProductForm from "@/components/forms/product-form";
import { Separator } from "@/components/ui/separator";
import { prisma } from "@/lib/prisma";

export default async function Page() {
  const categories = await prisma.category.findMany();
  const sizes = await prisma.size.findMany();
  const colors = await prisma.color.findMany();
  return (
    <div className="py-12">
      <div className="mb-4">
        <h1 className="text-3xl font-bold">Create product</h1>
        <p className="opacity-80">Add a new product</p>
      </div>
      <Separator />
      <div className="mt-6">
        <ProductForm categories={categories} sizes={sizes} colors={colors} />
      </div>
    </div>
  );
}
