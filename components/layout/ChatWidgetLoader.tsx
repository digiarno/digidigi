"use client";

import dynamic from "next/dynamic";

const ChatWidgetLazy = dynamic(
  () => import("@/components/layout/ChatWidget").then((mod) => mod.ChatWidget),
  { ssr: false },
);

export function ChatWidgetLoader() {
  return <ChatWidgetLazy />;
}
