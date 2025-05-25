import React, { createContext, useState, useEffect } from 'react';

// Cria o contexto
export const UserContext = createContext();

// Componente Provider
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Recuperar usuário do localStorage (persistência)
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};
