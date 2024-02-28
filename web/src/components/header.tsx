import { PlusIcon } from "lucide-react";
import Image from "next/image";

export function Header() {
  return (
    <div className="w-full max-w-3xl mx-auto flex items-center justify-between">
      <Image
        src="/logo.svg"
        alt="Habits logo"
        width="148"
        height="72"
      />

      <button
        type="button"
        className="border border-violet-500 hover:border-violet-300 font-semibold rounded-lg px-6 py-4 flex items-center gap-3"
      >
        <PlusIcon className="stroke-violet-500 size-5" />
        Novo hábito
      </button>
    </div>
  );
}
