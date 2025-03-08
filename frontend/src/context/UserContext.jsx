import { createContext } from "react";
import userAuth from "../hooks/useAuth";

export const Context = createContext();

export function UserProvider({ children }) {
    const { register } = userAuth();
    return <Context.Provider value={{ register }}>{children}</Context.Provider>;
}
