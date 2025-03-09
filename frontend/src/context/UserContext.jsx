import { createContext } from "react";
import userAuth from "../hooks/useAuth";

export const Context = createContext();

export function UserProvider({ children }) {
    const { authed, loading, register } = userAuth();
    return <Context.Provider value={{ register, authed, loading }}>{children}</Context.Provider>;
}
