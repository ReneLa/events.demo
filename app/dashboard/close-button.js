"use client"

import { X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CloseButton() {
    const router = useRouter()
    return (
        <div className="relative w-full">
            <button
                onClick={() => router.replace('/')}
                className="absolute top-0 right-0 w-11 h-11 bg-red-400 rounded-full flex flex-col items-center justify-center hover:bg-black">
                <X size={24} />
            </button>
        </div>
    );
}