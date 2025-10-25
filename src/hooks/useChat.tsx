import { API_ENDPOINTS } from "@/apis/apiEndpoints";
import api from "@/services/apiService";
import { clearChatHistory, getChatHistory, getToken, setChatHistory } from "@/utils/storageUtils";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useChats } from "./useChats";

interface Message {
  content: string;
  role: 'user' | 'assistant';
}

export default function useChat() {
  const { currentSessionId } = useChats();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentSessionId) {
      setMessages([]);
      fetchMessages(currentSessionId);
    } else {
      setMessages([]);
    }
  }, [currentSessionId]);

  const fetchMessages = async (sessionId: string) => {
    try {
      const res = await api.get(API_ENDPOINTS.CHAT_SESSION.replace(':sessionId', sessionId));
      const history: Message[] = res.data.messages.map((msg: any) => ({
        content: msg.content,
        role: msg.role as 'user' | 'assistant',
      }));
      setMessages(history);
    } catch (error) {
      toast.error('Error loading messages');
    }
  };

  const sendMessage = async (message: string) => {
    if (!currentSessionId) {
      toast.error('No active chat session');
      return;
    }
    const userMessage: Message = { content: message, role: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    try {
      const res = await api.post(API_ENDPOINTS.CHAT_SEND, { message, sessionId: currentSessionId });
      const botMessage: Message = { content: res.data.response, role: 'assistant' };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'An error occurred while sending the message');
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    toast.success('Chat cleared');
  };

  return { messages, sendMessage, loading, clearChat };
}