"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductColumn = {
  id: string;
  name: string;
  price: number;
  category: string;
  size: string;
  color: string;
  isFeatured: boolean;
  isPaid: boolean;
  createdAt: string;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "color",
    header: "Color",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <div
          className="h-6 w-6 rounded-full border"
          style={{ backgroundColor: `${row.original.color}` }}
        />
        <span>{row.original.color}</span>
      </div>
    ),
  },
  {
    accessorKey: "isFeatured",
    header: "isFeatured",
  },
  {
    accessorKey: "isPaid",
    header: "isPaid",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <>
          <CellAction product={product} />
        </>
      );
    },
  },
];
