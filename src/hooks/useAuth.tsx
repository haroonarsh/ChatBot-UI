import { API_ENDPOINTS } from "@/apis/apiEndpoints";
import api from "@/services/apiService";
import { clearChatHistory, getToken, removeToken, setToken } from "@/utils/storageUtils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const token = getToken();
        console.log("Token from storage:", token);
        setIsAuthenticated(!!token); // token ? true : false
    }, []);

    const authRequest = async (endpoint: string, data: { name?: string; email: string; password: string }) => {
        setLoading(true);
        setError(null);
        try {
            const res = await api.post(endpoint, data);
            setToken(res.data.token);
            setIsAuthenticated(true);
            toast.success('Authentication successful!');
            router.push('/chat');
        } catch (error: any) {
            setError(error.response?.data?.message || 'An error occurred');
            toast.error(error.response?.data?.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const register = (data: { name: string; email: string; password: string }) => authRequest(API_ENDPOINTS.REGISTER, data);
    const login = (data: { email: string; password: string }) => authRequest(API_ENDPOINTS.LOGIN, data);

    const logout = () => {
        removeToken();
        clearChatHistory();
        setIsAuthenticated(false);
        router.push('/login');
        toast.success('Logged out successfully!');
    };

    return { isAuthenticated, loading, error, register, login, logout };
}