import { getAuth, signOut } from "firebase/auth";
import { useState, useEffect } from "react";

const [cancelled, setCancelled] = useState<boolean>(false);
const auth = getAuth()

function checkIsCancelled() {
    if (cancelled) {
        return;
    }
}
// Função de logout
export const logout = (): void => {
    checkIsCancelled();
    signOut(auth);
};

useEffect(() => {
    return () => setCancelled(true);
}, []);