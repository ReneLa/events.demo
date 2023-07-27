"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { AlignJustify } from "lucide-react";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/user/auth.slice";
import { useRouter } from "next/navigation";

export default function MenuButton() {
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          aria-label="Update dimensions"
          className="absolute top-14 -right-2 w-12 h-12 drop-shadow-xl rounded-full  bg-[#702ec2] border-2 border-solid border-[#702ec2] cursor-pointer text-base items-center justify-center inline-flex font-medium outline-none tracking-tight transition-colors duration-200 ease-in-out hover:bg-[#19191C]"
        >
          <AlignJustify size={20} />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[180px] border-2 border-solid border-[#702ec2] bg-[#19191C] rounded-lg p-4 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
          sideOffset={5}
        >
          <DropdownMenu.Item
            onClick={() => router.push("/dashboard")}
            className="group cursor-pointer text-[15px] font-medium leading-none text-mauve11 rounded-[3px] flex items-center h-9 px-2 relative  select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-white"
          >
            My ticket
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onClick={() => dispatch(setCredentials(null))}
            className="group cursor-pointer text-[15px] font-medium leading-none text-mauve11 rounded-[3px] flex items-center h-9 px-2 relative  select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-white"
          >
            Logout
          </DropdownMenu.Item>
          <DropdownMenu.Arrow className="fill-[#702ec2]" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
