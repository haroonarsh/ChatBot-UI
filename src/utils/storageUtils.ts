import { getCookie, setCookie, deleteCookie } from "cookies-next"

export const getToken = (): string | undefined => {
    try {
        return getCookie('token') as string | undefined;
    } catch (error) {
        return undefined;
    }
};

export const setToken = (token: string): void => {
    try {
        setCookie('token', token, {
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/',
            sameSite: 'lax', // send cookie both same-site and cross-site requests
            secure: process.env.NODE_ENV === 'development',
        });
    } catch (error: any) {
        console.error('Error setting token cookie:', error);
    }
};

export const removeToken = (): void => {
    try {
        deleteCookie('token');
    } catch (error: any) {
        console.error('Error deleting token cookie:', error);
    }
};

export const getChatHistory = (): { content: string; role: 'user' | 'assistant' }[] | null => {
    try {
        const history = getCookie('chatHistory') as string | undefined;
        return history ? JSON.parse(history) : null;
    } catch (error) {
        return null;
    }
};

export const setChatHistory = (history: { content: string; role: 'user' | 'assistant' }[]): void => {
    try {
        setCookie('chatHistory', JSON.stringify(history), {
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/',
            sameSite: 'lax', // send cookie both same-site and cross-site requests
            secure: process.env.NODE_ENV === 'development',
        });
    } catch (error: any) {
        console.error('Error setting chat history cookie:', error);
    }
};

export const clearChatHistory = (): void => {
    try {
        deleteCookie('chatHistory');
    } catch (error: any) {
        console.error('Error deleting chat history cookie:', error);
    }
};