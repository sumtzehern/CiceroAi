import { ModeToggle } from "@/components/mode-toggle";
import Image from "next/image";
import Roomspage from "./rooms";

export default function Home() {
  return (
    <main>
      <div className="p-4 flex h-12 items-center justify-between supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="flex items-center">
          <Image
            src="/logo.png"
            width={40}
            height={40}
            alt="the application logo"
            style={{ borderRadius: "30%" }}
          />
          <span className="ml-2 font-bold text-2xl">CiceroAI</span>
        </div>
        <ModeToggle />
      </div>
      <Roomspage />
    </main>
  );
}
