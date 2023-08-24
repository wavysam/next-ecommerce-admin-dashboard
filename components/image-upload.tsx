"use client";

import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "./ui/button";
import { ImagePlus, Trash } from "lucide-react";

interface Props {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

export default function ImageUpload({
  disabled,
  onChange,
  onRemove,
  value,
}: Props) {
  const onUpload = (result: any) => {
    console.log(result.info.secure_url);
    onChange(result.info.secure_url);
  };

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md oveflow-hidden"
          >
            <div className="absolute top-2 z-10 right-2">
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="h-8 w-8"
                onClick={() => onRemove(url)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image
              src={url}
              fill
              alt="Product Image"
              className="object-cover"
            />
          </div>
        ))}
      </div>
      <CldUploadWidget onUpload={onUpload} uploadPreset="xw3bjr31">
        {({ open }) => {
          const handleOnclick = (e: any) => {
            e.preventDefault();
            open();
          };
          return (
            <Button
              type="button"
              variant="secondary"
              disabled={disabled}
              onClick={handleOnclick}
              className="mb-6"
            >
              <ImagePlus className="h-6 -w-6 mr-2" />
              <span>Add product image</span>
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
}
