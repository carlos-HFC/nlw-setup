import { CheckIcon } from "lucide-react";

export function NewHabitForm() {
  return (
    <form className="w-full flex flex-col mt-6">
      <label
        htmlFor="title"
        className="font-semibold leading-tight"
      >
        Qual o seu comprometimento?
      </label>

      <input
        type="text"
        id="title"
        placeholder="ex.: Exercícios, dormir bem, etc..."
        autoFocus
        className="p-4 rounded-lg mt-3 bg-zinc-800 placeholder:text-zinc-400"
      />

      <label
        className="font-semibold leading-tight mt-4"
      >
        Qual a recorrência?
      </label>

      <button
        type="submit"
        className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500"
      >
        <CheckIcon className="size-5 stroke-[4px]" />
        Confirmar
      </button>
    </form>
  );
}