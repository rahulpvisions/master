import { useState } from "react";
import LoginContext from "./LoginContext"

const LoginProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    return (
        <LoginContext.Provider value={{user, setUser}}>
            {children}
        </LoginContext.Provider>
    )
}

export default LoginProvider;