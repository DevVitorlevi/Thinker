import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

const Home = () => {
    // Tipando o estado como User | null para garantir que o estado seja do tipo correto
    const [usuario, setUsuario] = useState<User | null>(null);

    useEffect(() => {
        const autenticacao = getAuth();

        // Observador para mudanças no estado de autenticação
        const cancelarObservador = onAuthStateChanged(autenticacao, (usuario) => {
            setUsuario(usuario);
        });

        return () => cancelarObservador(); // Remover o observador ao desmontar o componente
    }, []);

    return (
        <>
            <h1>j</h1>
        </>
    );
};

export default Home;
