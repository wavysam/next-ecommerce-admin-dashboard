"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Category } from "@prisma/client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Props {
  initialData?: Category | null;
}

const categorySchema = z.object({
  name: z.string().nonempty().min(2),
});

export default function CategoryForm({ initialData }: Props) {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: initialData?.name || "",
    },
  });

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const onSubmit = async (data: z.infer<typeof categorySchema>) => {
    if (initialData) {
      await delay(1000);
      const res = await fetch(`/api/category/${initialData.id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
      if (res.ok) {
        toast({
          title: "Success!",
          description: "Category updated",
        });
        router.push("/categories");
        router.refresh();
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong!",
          description: "Failed to update category",
        });
      }
    } else {
      await delay(1000);
      const res = await fetch("/api/category", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast({
          title: "Success!",
          description: "Category created",
        });
        router.push("/categories");
        router.refresh();
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong!",
          description: "Failed to create category",
        });
      }
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <Label>Name</Label>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {initialData ? (
            <Button className="mt-4" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? (
                <span className="flex items-center gap-2">
                  Updating <Loader2 className="h-4 w-4 animate-spin" />
                </span>
              ) : (
                "Update"
              )}
            </Button>
          ) : (
            <Button className="mt-4" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? (
                <span className="flex items-center gap-2">
                  Creating <Loader2 className="h-4 w-4 animate-spin" />
                </span>
              ) : (
                "Create"
              )}
            </Button>
          )}
        </form>
      </Form>
    </>
  );
}
