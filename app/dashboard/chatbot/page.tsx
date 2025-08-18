"use client";
import Chatbot from "@/components/chatbot";
import { useExpenses } from "@/hooks/use-expenses";
import { DashboardLayout } from "@/components/dashboard-layout";

export default function ChatbotPage() {
  const { expenses } = useExpenses();
  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center w-full h-full min-h-[80vh] p-4">
        <div className="w-full max-w-4xl mx-auto">
          <Chatbot expenses={expenses} fullPage />
        </div>
      </div>
    </DashboardLayout>
  );
}
