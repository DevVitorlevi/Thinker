import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/config"; // Importando a instância correta do Firebase Auth

const googleProvider = new GoogleAuthProvider();

// Função para fazer login com o Google
export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        console.log("Usuário logado com Google:", result.user);
        return result.user; // Retorna os dados do usuário autenticado
    } catch (error) {
        console.error("Erro ao fazer login com Google:", error);
        return null;
    }
};
