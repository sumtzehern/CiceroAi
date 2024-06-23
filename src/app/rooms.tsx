'use client';

import React, { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import CameraView from "./cameraView";
import { Button } from "@/components/ui/button";
import PhoneIcon from "@/components/ui/phoneIcon";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { 
  MainContainer, 
  ChatContainer, 
  MessageList, 
  Message, 
  MessageInput as DefaultMessageInput, 
  MessageModel 
} from "@chatscope/chat-ui-kit-react";

// Define direction and position types if not exported from the library
type MessageDirection = "incoming" | "outgoing";
type MessagePosition = "single" | "normal" | "first" | "last";

const Roomspage: React.FC = () => {
  const [messages, setMessages] = useState<Array<{ 
    id: number; 
    message: string; 
    sentTime: string; 
    sender: string; 
    direction: MessageDirection; 
    position: MessagePosition 
  }>>([
    { id: 1, message: "Hello, what would you like to debate about today?", sentTime: "just now", sender: "assistant", direction: "incoming", position: "single" },
    { id: 2, message: "I'd like to discuss climate change.", sentTime: "just now", sender: "user", direction: "outgoing", position: "single" },
    { id: 3, message: "Great choice! What specific aspect of climate change interests you the most?", sentTime: "just now", sender: "assistant", direction: "incoming", position: "single" },
    { id: 4, message: "Well, um, I was thinking, you know, about how, uh, the temperatures are rising?", sentTime: "just now", sender: "user", direction: "outgoing", position: "single" },
    { id: 5, message: "Indeed, rising temperatures are a critical issue. Do you have any thoughts on the primary causes?", sentTime: "just now", sender: "assistant", direction: "incoming", position: "single" },
    { id: 6, message: "Oh, uh, yeah, I guess, like, CO2 emissions from, um, cars and factories?", sentTime: "just now", sender: "user", direction: "outgoing", position: "single" },
    { id: 7, message: "Absolutely, CO2 emissions play a significant role. How do you think we can reduce these emissions effectively?", sentTime: "just now", sender: "assistant", direction: "incoming", position: "single" },
    { id: 8, message: "Um, maybe, uh, using more renewable energy sources, like, uh, solar and wind power?", sentTime: "just now", sender: "user", direction: "outgoing", position: "single" },
    { id: 9, message: "That's a solid idea! Solar and wind power are excellent renewable resources. What challenges do you think we might face in transitioning to these energy sources?", sentTime: "just now", sender: "assistant", direction: "incoming", position: "single" },
    { id: 10, message: "Well, uh, I think, um, the cost and, uh, maybe the technology isn't, um, advanced enough?", sentTime: "just now", sender: "user", direction: "outgoing", position: "single" },
    { id: 11, message: "Those are valid points. The initial cost and technological advancements are indeed challenges. How do you propose we address these obstacles?", sentTime: "just now", sender: "assistant", direction: "incoming", position: "single" },
    { id: 12, message: "Um, maybe, like, investing more in research and, uh, government subsidies?", sentTime: "just now", sender: "user", direction: "outgoing", position: "single" },
    { id: 13, message: "Investing in research and providing subsidies are great strategies. What other measures do you think can be implemented to combat climate change?", sentTime: "just now", sender: "assistant", direction: "incoming", position: "single" },
    { id: 14, message: "Oh, uh, probably, like, encouraging people to, um, reduce their carbon footprint by, uh, using public transport and, um, recycling?", sentTime: "just now", sender: "user", direction: "outgoing", position: "single" },
    { id: 15, message: "Yes, reducing personal carbon footprints is crucial. What role do you think education and awareness play in this process?", sentTime: "just now", sender: "assistant", direction: "incoming", position: "single" },
    { id: 16, message: "Uh, I guess, um, educating people is, like, really important so they, um, understand the impact of their actions?", sentTime: "just now", sender: "user", direction: "outgoing", position: "single" },
    { id: 17, message: "Definitely! Education and awareness are key to making informed decisions. What methods do you think are most effective for educating the public about climate change?", sentTime: "just now", sender: "assistant", direction: "incoming", position: "single" },
    { id: 18, message: "Um, maybe, like, school programs and, uh, social media campaigns?", sentTime: "just now", sender: "user", direction: "outgoing", position: "single" },
    { id: 19, message: "School programs and social media campaigns are excellent methods. They can reach a wide audience and foster better understanding. Do you think there are other areas where we can make a significant impact?", sentTime: "just now", sender: "assistant", direction: "incoming", position: "single" },
    { id: 20, message: "Oh, um, I think, like, businesses can, uh, also play a big role by, um, adopting greener practices?", sentTime: "just now", sender: "user", direction: "outgoing", position: "single" },
    { id: 21, message: "Absolutely, businesses adopting greener practices can have a huge impact. What incentives do you think could encourage businesses to go green?", sentTime: "just now", sender: "assistant", direction: "incoming", position: "single" },
    { id: 22, message: "Uh, maybe, like, tax breaks and, um, recognition for their efforts?", sentTime: "just now", sender: "user", direction: "outgoing", position: "single" }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSend = (message: string) => {
    if (message.trim() !== "") {
      const newMessage = {
        id: messages.length + 1,
        message: message,
        sentTime: "just now",
        sender: "user",
        direction: "outgoing" as MessageDirection,
        position: "single" as MessagePosition
      };
      setMessages([...messages, newMessage]);
      setInputMessage("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputMessage(e.target.value);
  };

  return (
    <div className="grid grid-cols-3 min-h-screen">
      <div className="col-span-3 md:col-span-2 p-4 pr-2">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-1 min-h-screen flex-col justify-center">
          <div className="flex items-center justify-center w-full">
            <CameraView />
          </div>
          <div className="w-full mt-2">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-2 flex flex-col gap-4">
              <h1 className="text-base">Topic</h1>
              <Textarea placeholder="Input your debate topic for Cicero" className="text-base text-gray-600" />
              <Button variant="default" className="w-full">Submit</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-lg border bg-card text-card-foreground shadow-sm p-4 flex flex-col gap-4 flex-grow col-span-3 md:col-span-1">
        <h1 className="text-base">AI Chat</h1>
        <div style={{ position: "relative", height: "300px" }}>
          <MainContainer>
            <ChatContainer>
              <MessageList>
                {messages.map((msg) => (
                  <Message
                    key={msg.id}
                    model={{
                      message: msg.message,
                      sentTime: msg.sentTime,
                      sender: msg.sender,
                      direction: msg.direction,
                      position: msg.position
                    }}
                    style={{ textAlign: msg.direction === "outgoing" ? "right" : "left" }}
                  />
                ))}
              </MessageList>
            </ChatContainer>
          </MainContainer>
        </div>

        <div className="mt-3 rounded-lg border bg-card text-card-foreground shadow-sm p-4 flex flex-col gap-4">
          <h1 className="text-base">Insights Report</h1>
          <Alert>
            <PhoneIcon className="h-4 w-4" />
            <AlertTitle>Top Emotions</AlertTitle>
            <AlertDescription>
              The top three emotions displayed by the user were:
    <ul>
      <li><strong>Confusion</strong> - 22.45%</li>
      <li><strong>Amusement</strong> - 13.08%</li>
      <li><strong>Awkwardness</strong> - 9.04%</li>
    </ul>
  </AlertDescription>

          </Alert>
          <Alert>
            <PhoneIcon className="h-4 w-4" />
            <AlertTitle>Critique</AlertTitle>
            <AlertDescription>
            Your conversation seems to be a bit scattered and reveals a high level of confusion. Try to articulate your thoughts more clearly to sound more coherent and foster better understanding with your conversation partners. Although your sense of amusement is well-perceived, aiming for more clarity and less awkwardness should help strengthen the quality of your debates.
            </AlertDescription>
          </Alert>
          <Button variant="default" className="w-full">Restart</Button>
        </div>
      </div>
    </div>
  );
};

export default Roomspage;
