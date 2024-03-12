"use client";

import * as C from '@radix-ui/react-checkbox';
import { CheckIcon } from "lucide-react";

import { cn } from "@/utils";

interface CheckboxProps extends C.CheckboxProps {
  dayhabit?: boolean;
  label: string;
}

export function Checkbox(props: Readonly<CheckboxProps>) {
  return (
    <C.Root
      className="flex items-center gap-3 group"
      {...props}
    >
      <div className="size-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500">
        <C.Indicator>
          <CheckIcon className="text-white size-5" />
        </C.Indicator>
      </div>

      <span className={cn("leading-tight text-white", props.dayhabit && "text-xl font-semibold group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400")}>
        {props.label}
      </span>
    </C.Root>
  );
}