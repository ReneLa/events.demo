"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CloseButton() {
  const router = useRouter();
  return (
    <div className="relative w-full">
      <button
        onClick={() => router.back()}
        className="absolute top-14 -left-2 w-11 h-11 z-10 rounded-full border-2 border-solid border-[#702ec2] cursor-pointer text-base items-center justify-center inline-flex font-medium outline-none tracking-tight transition-colors duration-200 ease-in-out hover:bg-[#19191C]"
      >
        <X size={20} />
      </button>
    </div>
  );
}
