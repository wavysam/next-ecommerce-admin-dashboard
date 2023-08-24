import Link from "next/link";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { prisma } from "@/lib/prisma";
import { SizeColumn, columns } from "./columns";
import dayjs from "dayjs";

export default async function Page() {
  const sizes = await prisma.size.findMany();
  const formattedSize: SizeColumn[] = sizes.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: dayjs(item.createdAt).format("MMMM DD, YYYY"),
  }));

  return (
    <div className="py-12">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold">Sizes ({sizes.length})</h1>
          <p className="text-sm opacity-80">Manage sizes for your products.</p>
        </div>
        <Link href="/sizes/new">
          <Button size="sm">Add New</Button>
        </Link>
      </div>
      <Separator />
      <div className="mt-12">
        <DataTable columns={columns} data={formattedSize} searchKey="name" />
      </div>
    </div>
  );
}
