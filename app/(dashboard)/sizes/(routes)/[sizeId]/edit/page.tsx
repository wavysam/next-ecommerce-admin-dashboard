import SizeForm from "@/components/forms/size-form";
import { Separator } from "@/components/ui/separator";
import { prisma } from "@/lib/prisma";

export default async function Page({ params }: { params: { sizeId: string } }) {
  const sizes = await prisma.size.findUnique({
    where: {
      id: params.sizeId,
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
        <SizeForm initialData={sizes} />
      </div>
    </div>
  );
}
