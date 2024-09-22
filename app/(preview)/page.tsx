"use client";

import { useRef } from "react";
import { Message } from "@/components/message";
import { useScrollToBottom } from "@/components/use-scroll-to-bottom";
import { motion } from "framer-motion";
import { MasonryIcon, VercelIcon } from "@/components/icons";
import Link from "next/link";
import { useChat } from "ai/react";

export default function Home() {
  const { messages, handleSubmit, input, setInput, append } = useChat();

  const inputRef = useRef<HTMLInputElement>(null);
  const [messagesContainerRef, messagesEndRef] =
    useScrollToBottom<HTMLDivElement>();

  const suggestedActions = [
    {
      title: "Answer this logic Puzzle",
      label: "Five runners finished a race. Amy finished before Bart.  Carl finished before Dan.  Dan finished before Emily.  Bart finished before Carl.  Who finished third?",
      action: "Five runners finished a race. Amy finished before Bart.  Carl finished before Dan.  Dan finished before Emily.  Bart finished before Carl.  Who finished third?",
    },
    {
      title: "Solve this riddle",
      label: "I am an odd number. Take away a letter and I become even. What number am I?",
      action: "What number am I? I am an odd number. Take away a letter and I become even.",
    },
    {
      title: "Calculate this",
      label: "What is the sum of the first 10 prime numbers?",
      action: "Calculate the sum of the first 10 prime numbers.",
    },
    {
      title: "Capital City Quiz",
      label: "What is the capital of Australia?",
      action: "What is the capital of Australia?",
    },
    {
      title: "Historical Fact Check",
      label: "Who painted the Mona Lisa?",
      action: "Who is the artist behind the Mona Lisa painting?",
    },
    {
      title: "Write a short poem",
      label: "About a cat sitting in a sunny window.",
      action: "Write a short poem about a cat sitting in a sunny window.",
    },
    {
      title: "Give me a travel suggestion",
      label: "I like history and beaches, where should I go?",
      action: "I'm looking for a travel destination with both historical sites and beautiful beaches. Any suggestions?",
    },
  ];

  return (
    <div className="flex flex-row justify-center pb-20 h-dvh bg-white dark:bg-zinc-900">
      <div className="flex flex-col justify-between gap-4">
        <div
          ref={messagesContainerRef}
          className="flex flex-col gap-6 h-full w-dvw items-center overflow-y-scroll"
        >
          {messages.length === 0 && (
            <motion.div className="h-[350px] px-4 w-full md:w-[500px] md:px-0 pt-20">
              <div className="border rounded-lg p-6 flex flex-col gap-4 text-zinc-500 text-sm dark:text-zinc-400 dark:border-zinc-700">
                <p className="flex flex-row justify-center gap-4 items-center text-zinc-900 dark:text-zinc-50">
                  <VercelIcon size={16} />
                  <span>+</span>
                  <MasonryIcon />
                </p>
                <p className="text-center">
                  multi-step generations with gpt 4o-mini
                </p>
              </div>
            </motion.div>
          )}

          {messages.map((message, i) => {
            // if (message.toolInvocations) return null;
            // const lastUserMessage = messages
            //   .slice(0, i)
            //   .filter((m) => m.role === "user")
            //   .pop();
            // const lastUserMessageIdx =
            //   messages.indexOf(lastUserMessage) ?? undefined;
            // const reasoningMessages = messages.slice(lastUserMessageIdx + 1, i);
            // if (reasoningMessages.length === 0 && message.content) {
            // }
            return (
              <Message
                key={message.id}
                role={message.role}
                content={message.content}
                toolInvocations={message.toolInvocations}
                reasoningMessages={[]}
              ></Message>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        <div className="grid sm:grid-cols-1 gap-2 w-full px-4 md:px-0 mx-auto md:max-w-[500px] mb-4">
          {messages.length === 0 &&
            suggestedActions.map((suggestedAction, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
                key={index}
                className={index > 1 ? "hidden sm:block" : "block"}
              >
                <button
                  onClick={async () => {
                    append({
                      role: "user",
                      content: suggestedAction.action,
                    });
                  }}
                  className="w-full text-left border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-300 rounded-lg p-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex flex-col"
                >
                  <span className="font-medium">{suggestedAction.title}</span>
                  <span className="text-zinc-500 dark:text-zinc-400">
                    {suggestedAction.label}
                  </span>
                </button>
              </motion.div>
            ))}
        </div>

        <form
          className="flex flex-col gap-2 relative items-center"
          onSubmit={handleSubmit}
        >
          <input
            ref={inputRef}
            className="bg-zinc-100 rounded-md px-2 py-1.5 w-full outline-none dark:bg-zinc-700 text-zinc-800 dark:text-zinc-300 md:max-w-[500px] max-w-[calc(100dvw-32px)]"
            placeholder="Send a message..."
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
            }}
          />
        </form>
      </div>
    </div>
  );
}
