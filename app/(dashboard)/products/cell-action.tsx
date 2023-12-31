"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { ProductColumn } from "./columns";
import ApiAlert from "@/components/api-alert";
import { useToast } from "@/components/ui/use-toast";

interface Props {
  product: ProductColumn;
}

export default function CellAction({ product }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleDelete = async () => {
    setOpen(true);
    setLoading(true);
    try {
      const res = await fetch(`/api/product/${product.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.refresh();
        toast({
          title: "Success!",
          description: "Product removed",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong!",
          description: "Failed to removed product",
        });
      }
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };

  return (
    <>
      <ApiAlert
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={handleDelete}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(product.id)}
          >
            <Copy className="h-4 w-4 mr-2" />
            <span>Copy ID</span>
          </DropdownMenuItem>
          <Link href={`/products/${product.id}/edit`}>
            <DropdownMenuItem>
              <Edit className="h-4 w-4 mr-2" />
              <span>Edit</span>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="h-4 w-4 mr-2" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
