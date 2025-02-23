import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
    User
} from "firebase/auth";
import { useState, useEffect } from "react";


interface FormData {
    email: string;
    senha: string;
    name: string;
}

export const useAuth = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [cancelled, setCancelled] = useState<boolean>(false);

    const auth = getAuth();

    // Função para verificar se a operação foi cancelada
    function checkIsCancelled() {
        if (cancelled) {
            return;
        }
    }

    // Função para criar um novo usuário com email e senha
    const createUser = async (formData: FormData): Promise<User | null> => {
        checkIsCancelled();
        setLoading(true);

        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.senha
            );

            await updateProfile(user, {
                displayName: formData.name
            });

            return user;
        } catch (error) {
            console.error("Erro ao criar usuário:", error);
            return null;
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return {
        auth,
        createUser,
        loading
    };
};