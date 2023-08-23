import ColorForm from "@/components/forms/color-form";
import { Separator } from "@/components/ui/separator";

export default function Page() {
  return (
    <div className="pt-12">
      <div className="mb-4">
        <h1 className="text-3xl font-bold">Create colors</h1>
        <p className="opacity-80">Add a new colors.</p>
      </div>
      <Separator />
      <div className="mt-6 sm:max-w-md">
        <ColorForm />
      </div>
    </div>
  );
}
