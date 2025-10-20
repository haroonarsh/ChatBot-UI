export const API_ENDPOINTS = {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    CHAT_SEND: '/api/chat',
    CHAT_HISTORY: '/api/chat/history',
    CHAT_NEW: '/api/chat/new',
    CHAT_SESSIONS: '/api/chat/sessions',
    CHAT_SESSION: '/api/chat/:sessionId',
} as const;