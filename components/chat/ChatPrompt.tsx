"use client";

import type { ChatStatus } from "ai";
import { ChatInput, type PromptInputMessage } from "./ChatInput";
import { RiOpenaiLine } from "@remixicon/react";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { Suggestion } from "@/components/ai-elements/suggestion";

export interface PromptSuggestion {
  label: string;
  value: string;
}

interface ChatPromptProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (message: PromptInputMessage) => void;
  status?: ChatStatus;
  suggestions?: PromptSuggestion[];
  selectedModel?: string;
  onModelChange?: (model: string) => void;
  title?: string;
  subtitle?: string;
  avatar?: React.ReactNode;
  placeholder?: string;
  enableModelSelect?: boolean;
  enableAttachments?: boolean;
}

const defaultSuggestions: PromptSuggestion[] = [
  {
    label: "Write a story",
    value: "Write a short creative story about a robot learning to paint",
  },
  {
    label: "Explain a concept",
    value: "Explain quantum computing in simple terms that anyone can understand",
  },
  {
    label: "Help me code",
    value: "Help me write a function that calculates the fibonacci sequence",
  },
  {
    label: "Plan a trip",
    value: "Help me plan a 5-day itinerary for visiting Tokyo, Japan",
  },
];

export function ChatPrompt({
  value,
  onChange,
  onSubmit,
  status = "ready",
  suggestions = defaultSuggestions,
  selectedModel,
  onModelChange,
  title,
  subtitle,
  avatar,
  placeholder,
  enableModelSelect,
  enableAttachments,
}: ChatPromptProps) {
  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion);
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-6 p-4">
      <div className="space-y-3 text-center">
        <div className="flex items-center justify-center gap-2 text-primary">
          {avatar ?? (
            <div className="flex items-center justify-center size-12 rounded-xl bg-primary">
              <RiOpenaiLine className="size-6 text-primary-offset animate-pulse" />
            </div>
          )}
        </div>
        <Shimmer as="h1" className="text-3xl font-bold tracking-tight">
          {title ?? "How can I help you today?"}
        </Shimmer>
        <p className="text-muted-foreground">
          {subtitle ?? "Start a conversation or try one of the suggestions below"}
        </p>
      </div>

      <div className="w-full max-w-2xl">
        <ChatInput
          value={value}
          onChange={onChange}
          onSubmit={onSubmit}
          status={status}
          placeholder={placeholder}
          selectedModel={selectedModel}
          onModelChange={onModelChange}
          enableModelSelect={enableModelSelect}
          enableAttachments={enableAttachments}
        />
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {suggestions.map((suggestion) => (
          <Suggestion
            key={suggestion.label}
            suggestion={suggestion.label}
            onClick={() => handleSuggestionClick(suggestion.value)}
          />
        ))}
      </div>
    </div>
  );
}
