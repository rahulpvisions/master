import { useState, useEffect } from "react";
import LoginContext from "./LoginContext"

const LoginProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Failed to parse user from localStorage", e);
                localStorage.removeItem("user");
            }
        }
    }, []);

    return (
        <LoginContext.Provider value={{user, setUser}}>
            {children}
        </LoginContext.Provider>
    )
}

export default LoginProvider;