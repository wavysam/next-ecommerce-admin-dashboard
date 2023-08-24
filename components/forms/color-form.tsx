"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { Size } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Props {
  initialData?: Size | null;
}

const colorSchema = z.object({
  name: z.string().nonempty().min(3),
  value: z.string().nonempty().min(1),
});

export default function ColorForm({ initialData }: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof colorSchema>>({
    resolver: zodResolver(colorSchema),
    defaultValues: {
      name: initialData?.name || "",
      value: initialData?.value || "",
    },
  });

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const onSubmit = async (data: z.infer<typeof colorSchema>) => {
    if (initialData) {
      await delay(1000);
      const res = await fetch(`/api/color/${initialData.id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast({
          title: "Success!",
          description: "Color updated",
        });
        router.push("/colors");
        router.refresh();
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong!",
          description: "Failed to update color",
        });
      }
    } else {
      await delay(1000);
      const res = await fetch("/api/color", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push("/colors");
        router.refresh();
        toast({
          title: "Success!",
          description: "Color created",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong!",
          description: "Failed to create color",
        });
      }
    }
  };
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem className="mb-3">
                <Label>Name</Label>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="value"
            control={form.control}
            render={({ field }) => (
              <FormItem className="mb-3">
                <Label>Value</Label>
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
