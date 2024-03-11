import { Header } from "@/components/header";
import { Summary } from "@/components/summary";

export default function Home() {
  return (
    <div className="w-dvw h-dvh flex justify-center items-center">
      <div className="w-full max-w-5xl px-6 flex flex-col gap-16">
        <Header />

        <Summary />
      </div>
    </div>
  );
}
