import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import useFlash from './useFlash';

export default function useAuth() {
    const [loading, setLoading] = useState(false);  // Estado de loading
    const { setFlash } = useFlash();
    const [authed, setAuthed] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(token)}`;
            setAuthed(true);
        }
    }, []);

    async function register(user) {
        setLoading(true);  // Inicia o loading
        try {
            const response = await api.post('/user/register', user);
            setFlash('Cadastro realizado com sucesso!', 'success');
            await authUser(response.data);
            return response.data;

        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Erro ao cadastrar';
            setFlash(errorMessage, 'error');
            return null;
        } finally {
            setLoading(false);  // Finaliza o loading
        }
    }

    async function authUser(data) {
        setAuthed(true);
        localStorage.setItem('token', JSON.stringify(data.token));
        navigate('/');
    }

    return { authed, loading, register };
}
