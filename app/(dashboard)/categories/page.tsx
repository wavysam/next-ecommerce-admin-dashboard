import dayjs from "dayjs";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { prisma } from "@/lib/prisma";
import { CategoryColumn, columns } from "./columns";
import Link from "next/link";

export default async function Page() {
  const categories = await prisma.category.findMany();

  const formattedCategory: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    createdAt: dayjs(item.createdAt).format("MMMM DD, YYYY"),
  }));
  return (
    <div className="py-12">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold">
            Categories ({categories.length})
          </h1>
          <p className="text-sm opacity-80">
            Manage categories for your products.
          </p>
        </div>
        <Link href="/categories/new">
          <Button size="sm">Add New</Button>
        </Link>
      </div>
      <Separator />
      <div className="mt-12">
        <DataTable
          columns={columns}
          data={formattedCategory}
          searchKey="name"
        />
      </div>
    </div>
  );
}
