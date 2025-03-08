import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Adicione esta linha
import api from '../utils/api';
import useFlash from './useFlash';

export default function useAuth() {
    const { setFlash } = useFlash();
    const [authed, setAuthed] = useState(false);  // Corrigido o uso do useState
    const navigate = useNavigate();

    useEffect(()=>{
        const token = localStorage.getItem('token');
        if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(token)}`;
            setAuthed(true);
        }
    },[])

    async function register(user) {
        try {
            const response = await api.post('/user/register', user);
            setFlash('Cadastro realizado com sucesso!', 'success');
            await authUser(response.data);  // Chame authUser com os dados recebidos
            return response.data;

        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Erro ao cadastrar';
            setFlash(errorMessage, 'error');
            return null;
        }
    }

    async function authUser(data) {
        setAuthed(true);
        localStorage.setItem('token', JSON.stringify(data.token));
        navigate('/');  // Navegação após autenticação
    }

    return {authed, register };
}
