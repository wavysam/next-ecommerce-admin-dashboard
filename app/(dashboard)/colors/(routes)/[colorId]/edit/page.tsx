import ColorForm from "@/components/forms/color-form";
import { Separator } from "@/components/ui/separator";
import { prisma } from "@/lib/prisma";

export default async function Page({
  params,
}: {
  params: { colorId: string };
}) {
  const colors = await prisma.color.findUnique({
    where: {
      id: params.colorId,
    },
  });

  return (
    <div className="py-12">
      <div className="mb-4">
        <h1 className="text-3xl font-bold">Update color</h1>
        <p className="opacity-80">Update existing color</p>
      </div>
      <Separator />
      <div className="mt-6">
        <ColorForm initialData={colors} />
      </div>
    </div>
  );
}
