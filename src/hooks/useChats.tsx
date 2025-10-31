import { API_ENDPOINTS } from '@/apis/apiEndpoints';
import api from '@/services/apiService';
import toast from 'react-hot-toast';
import { create } from 'zustand';

interface Session {
    id: string;
    title: string;
    updatedAt: Date;
}

interface ChatStore {
    sessions: Session[];
    currentSessionId: string | null;
    fetchSessions: () => Promise<void>;
    createNewSession: () => Promise<void>;
    setCurrentSession: (id: string) => void;
}

export const useChats = create<ChatStore>((set, get) => ({
    sessions: [],
    currentSessionId: null,
    fetchSessions: async () => {
        try {
            const res = await api.get(API_ENDPOINTS.CHAT_SESSIONS);
            set({ sessions: res.data.sessions });
        } catch (error) {
            toast.error('Failed to fetch sessions');
        }
    },
    createNewSession: async () => {
        try {
            const res = await api.post(API_ENDPOINTS.CHAT_NEW);
            const newId = res.data.sessionId;
            set({ currentSessionId: newId });
            await get().fetchSessions(); // Refetch list
            toast.success('New chat started');
        } catch (error) {
            toast.error('Error creating session');
        }
    },
    setCurrentSession: (id: string) => set({ currentSessionId: id }),
}));