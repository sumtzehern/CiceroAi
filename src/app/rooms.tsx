'use client';

import { Textarea } from "@/components/ui/textarea";
import CameraView from "./cameraView";
import { Button } from "@/components/ui/button";
import PhoneIcon from "@/components/ui/phoneIcon"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"


export default function Roomspage() {
  return (
    <div className="grid grid-cols-3 min-h-screen">
      <div className="col-span-2 p-4 pr-2">
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

        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 flex flex-col gap-4">
          <h1 className="text-base">Insights Report</h1>
          
          <Alert>
            <PhoneIcon className="h-4 w-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              Make sure to call this phone number in order to debate! *INSERT PHONE NUM HERE*
            </AlertDescription>
          </Alert>

          <Alert>
            <PhoneIcon className="h-4 w-4" />
            <AlertTitle>Another reminder!</AlertTitle>
            <AlertDescription>
              Have fun and use this AI responsibly!
            </AlertDescription>
          </Alert>
          {/* <Textarea placeholder="Input your prompt for EVI" className="text-base text-gray-600"/> */}
          {/* <Button variant="default" className="w-full">Submit</Button> */}
        </div>
      </div>
        
    </div>
  );
}
