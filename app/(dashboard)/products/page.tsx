import Link from "next/link";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { prisma } from "@/lib/prisma";
import { columns } from "./columns";
import dayjs from "dayjs";

export default async function Page() {
  const products = await prisma.product.findMany({
    include: {
      category: true,
      size: true,
      color: true,
    },
  });
  const formattedProducts = products.map((product) => ({
    id: product.id,
    name: product.name,
    price: product.price,
    category: product.category.name,
    size: product.size.name,
    color: product.color.value,
    isFeatured: product.isFeatured,
    isPaid: product.isPaid,
    createdAt: dayjs(product.createdAt).format("MMMM DD, YYYY"),
  }));
  return (
    <div className="py-12">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold">Products ({products.length})</h1>
          <p className="text-sm opacity-80">Manage products.</p>
        </div>
        <Link href="/products/new">
          <Button size="sm">Add New</Button>
        </Link>
      </div>
      <Separator />
      <div className="mt-12">
        <DataTable
          columns={columns}
          data={formattedProducts}
          searchKey="name"
        />
      </div>
    </div>
  );
}
