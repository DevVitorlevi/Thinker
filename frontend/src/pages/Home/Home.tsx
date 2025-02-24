import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

const Home = () => {
    const [, setUsuario] = useState<User | null>(null);
    useEffect(() => {
        const autenticacao = getAuth();
        const cancelarObservador = onAuthStateChanged(autenticacao, (usuario) => {
            setUsuario(usuario);
        });


        return () => cancelarObservador();
    }, []);
    return (
        <>

        </>
    );
};

export default Home;