import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { ColorColumn, columns } from "./columns";
import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";

export default async function Page() {
  const colors = await prisma.color.findMany();

  const formattedColor: ColorColumn[] = colors.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: dayjs(item.createdAt).format("MMMM DD, YYYY"),
  }));
  return (
    <div className="py-12">
      {" "}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold">Colors ({colors.length})</h1>
          <p className="text-sm opacity-80">Manage colors for your products.</p>
        </div>
        <Link href="/colors/new">
          <Button size="sm">Add New</Button>
        </Link>
      </div>
      <Separator />
      <div className="mt-12">
        <DataTable columns={columns} data={formattedColor} searchKey="name" />
      </div>
    </div>
  );
}
