"use client";

import * as Popover from "@radix-ui/react-popover";

import { ProgressBar } from "./progress-bar";

import { cn } from "@/utils";

interface DayProps {
  amount: number;
  completed: number;
}

export function Day({ amount, completed }: Readonly<DayProps>) {
  const completePercentage = Math.round((completed / amount) * 100);

  return (
    <Popover.Root>
      <Popover.Trigger
        className={cn(
          "size-10 border-2 rounded-lg",
          completePercentage === 0 && 'bg-zinc-900 border-zinc-800',
          completePercentage > 0 && completePercentage < 20 && 'border-violet-700 bg-violet-900',
          completePercentage >= 20 && completePercentage < 40 && 'border-violet-600 bg-violet-800',
          completePercentage >= 40 && completePercentage < 60 && 'border-violet-500 bg-violet-700',
          completePercentage >= 60 && completePercentage < 80 && 'border-violet-500 bg-violet-600',
          completePercentage >= 80 && 'border-violet-400 bg-violet-500',
        )}
      />

      <Popover.Portal>
        <Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col">
          <span className="font-semibold text-zinc-400">Segunda-feira</span>
          <span className="mt-1 font-extrabold text-3xl leading-tight">17/01</span>

          <ProgressBar progress={completePercentage} />

          <Popover.Arrow className="fill-zinc-900 h-2 w-4" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}