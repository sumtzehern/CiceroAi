import { ModeToggle } from "@/components/mode-toggle";
import Image from "next/image";
import Roomspage from "./rooms";

export default function Home() {
  return (
    <main>
      <div className=" p-4 flex h-14 items-center justify-between supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <span className="font-bold">EngageEye</span>
        <ModeToggle />
      </div>
      < Roomspage />
    </main>
  );
}
