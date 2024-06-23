'use client';

import React, { useState, useEffect } from 'react';
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
import io from 'socket.io-client';

// Define direction and position types if not exported from the library
type MessageDirection = "incoming" | "outgoing";
type MessagePosition = "single" | "normal" | "first" | "last";

const socket = io('http://localhost:5000'); // Adjust the URL if necessary

const Roomspage: React.FC = () => {
  const [messages, setMessages] = useState<Array<{ 
    id: number; 
    message: string; 
    sentTime: string; 
    sender: string; 
    direction: MessageDirection; 
    position: MessagePosition 
  }>>([]);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    console.log('Setting up WebSocket connection');
    socket.on('result', (data) => {
      const newMessage = {
        id: messages.length + 1,
        message: data.result.content,
        sentTime: "just now",
        sender: data.result.role === "assistant" ? "assistant" : "user",
        direction: data.result.role === "assistant" ? "incoming" : "outgoing",
        position: "single" as MessagePosition
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      console.log('Cleaning up WebSocket connection');
      socket.off('result');
    };
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputMessage(e.target.value);
  };

  const handleSend = () => {
    if (inputMessage.trim() !== "") {
      const newMessage = {
        id: messages.length + 1,
        message: inputMessage,
        sentTime: "just now",
        sender: "user",
        direction: "outgoing" as MessageDirection,
        position: "single" as MessagePosition
      };
      setMessages([...messages, newMessage]);
      setInputMessage("");
      socket.emit('process', { input: inputMessage });
    }
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
              <Textarea 
                placeholder="Input your debate topic for Cicero" 
                className="text-base text-gray-600" 
                value={inputMessage}
                onChange={handleInputChange}
              />
              <Button variant="default" className="w-full" onClick={handleSend}>Submit</Button>
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
          <Button variant="default" className="w-full">Restart</Button>
        </div>
      </div>
    </div>
  );
};

export default Roomspage;
