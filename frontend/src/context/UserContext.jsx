import { createContext } from "react";
import userAuth from "../hooks/useAuth";

const Context = createContext();

function UserProvider({ children }) {
    const { register } = userAuth()
    return <Context.Provider value={{ register }}>{children}</Context.Provider>;
}

export { Context, UserProvider }