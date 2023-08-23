import CategoryForm from "@/components/forms/category-form";
import { Separator } from "@/components/ui/separator";
import { prisma } from "@/lib/prisma";

export default async function Page({
  params,
}: {
  params: { categoryId: string };
}) {
  const categories = await prisma.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });

  return (
    <div className="pt-12">
      <div className="mb-4">
        <h1 className="text-3xl font-bold">Update category</h1>
        <p className="opacity-80">Add a new category</p>
      </div>
      <Separator />
      <div className="mt-6">
        <CategoryForm initialData={categories} />
      </div>
    </div>
  );
}
