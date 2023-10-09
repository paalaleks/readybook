import { Popover } from "@headlessui/react";
import Image from "next/image";

export default function PopoverComponent({ children, classes, icon }) {
  return (
    <Popover className="relative">
      <Popover.Button as="button" className={classes}>
        <div className="flex flex-col items-center -mx-2">
          <Image
            width={200}
            height={200}
            className="object-cover w-10 h-10 rounded-full"
            src={icon}
            alt="avatar"
          />
        </div>
      </Popover.Button>
      <Popover.Overlay className="fixed inset-0 bg-black opacity-5 cursor-pointer" />

      <Popover.Panel className="">{children}</Popover.Panel>
    </Popover>
  );
}
