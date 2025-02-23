import React, { createContext, useContext, ReactNode, useState } from "react";
import { User } from "firebase/auth";

interface AuthContextType {
    usuario: User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [usuario, setUsuario] = useState<User | null>(null);

    return (
        <AuthContext.Provider value={{ usuario }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
