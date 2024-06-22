'use client';

import { Textarea } from "@/components/ui/textarea";
import CameraView from "./cameraView";
import { Button } from "@/components/ui/button";

export default function Roomspage() {
  return (
    <div className="grid grid-cols-4 min-h-screen">
      <div className="col-span-3 p-4 pr-2">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 min-h-screen flex items-start justify-center">
          <CameraView />
        </div>
      </div>

      <div className="col-span-1 p-4 pl-2 flex flex-col">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 flex flex-col gap-4">
          <h1 className="text-base">Topic</h1>
          <Textarea placeholder="Input your prompt for EVI" className="text-base text-gray-600"/>
          <Button variant="default" className="w-full">Submit</Button>
        </div>
      </div>
    </div>
  );
}
