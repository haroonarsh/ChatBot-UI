import { API_ENDPOINTS } from "@/apis/apiEndpoints";
import api from "@/services/apiService";
import { getChatHistory, setChatHistory } from "@/utils/storageUtils";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Message {
  content: string;
  role: 'user' | 'assistant';
}

export default function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const history = getChatHistory();
    if (history) setMessages(history);
  }, []);

  const sendMessage = async (message: string) => {
    const userMessage: Message = { content: message, role: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setChatHistory([...messages, userMessage]); // Update storage
    setLoading(true);

    try {
      const res = await api.post(API_ENDPOINTS.CHAT_SEND, { message });
      const botMessage: Message = { content: res.data.response, role: 'assistant' };
      setMessages((prev) => [...prev, botMessage]);
      setChatHistory([...messages, userMessage, botMessage]); // Update storage
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'An error occurred while sending the message');
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setChatHistory([]); // Clear storage
    toast.success('Chat history cleared');
  };

  return { messages, sendMessage, loading, clearChat };
}