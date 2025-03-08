// API
import api from '../utils/api';

export default function useAuth() {
    async function register(user) {
        try {
            const response = await api.post('/user/register', user);
            return response.data; // Retorna os dados da resposta
        } catch (error) {
            console.error("Erro ao registrar:", error.response?.data || error.message);
            return null; // Retorna null ou pode lançar um erro personalizado
        }
    }
    
    return { register };
}
