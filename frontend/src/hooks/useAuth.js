import api from '../utils/api';
import useFlash from './useFlash';

export default function useAuth() {
    const { setFlash } = useFlash();

    async function register(user) {
        console.log("Enviando para o backend:", user); // Verificar os dados
    
        try {
            const response = await api.post('/user/register', user);
            setFlash('Cadastro realizado com sucesso!', 'success');
            return response.data;
        } catch (error) {
            console.log("Erro no cadastro:", error.response?.data);
            const errorMessage = error.response?.data?.message || 'Erro ao cadastrar';
            setFlash(errorMessage, 'error');
            return null;
        }
    }

    return { register };
}
