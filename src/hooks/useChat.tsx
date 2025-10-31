import { API_ENDPOINTS } from "@/apis/apiEndpoints";
import api from "@/services/apiService";
// import { clearChatHistory, getChatHistory, getToken, setChatHistory } from "@/utils/storageUtils";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useChats } from "./useChats";
import { AxiosError } from "axios";

interface Message {
  content: string;
  role: 'user' | 'assistant';
}

// Define a type for backend message to avoid 'any'
interface BackendMessage {
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
      const history: Message[] = res.data.messages.map((msg: BackendMessage) => ({
        content: msg.content,
        role: msg.role as 'user' | 'assistant',
      }));
      setMessages(history);
    } catch (error: unknown) {
      console.error('Error fetching messages:', error);
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
    } catch (error: unknown) {
      console.error('Error sending message:', error);  // Log to "use" the variable and debug
            const axiosError = error as AxiosError;  // Cast to AxiosError for safe access
            const errorMessage = (axiosError.response?.data as { message?: string })?.message  || 'An error occurred';
            toast.error(errorMessage);
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