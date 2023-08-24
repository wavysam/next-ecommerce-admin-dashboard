import SizeForm from "@/components/forms/size-form";
import { Separator } from "@/components/ui/separator";

export default function Page() {
  return (
    <div className="py-12">
      <div className="mb-4">
        <h1 className="text-3xl font-bold">Create category</h1>
        <p className="opacity-80">Add a new category</p>
      </div>
      <Separator />
      <div className="mt-6 sm:max-w-md">
        <SizeForm />
      </div>
    </div>
  );
}
