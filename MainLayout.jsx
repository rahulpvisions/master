import { useContext, useEffect, useState } from "react";
import Header from "./components/Sections/header"
import { Outlet } from "react-router-dom";
import LoginContext from "./LoginContext";

const MainLayout = () => {
    const {user} = useContext(LoginContext);
    
    // useEffect(() => {
    //     const storedUser = localStorage.getItem("user");
    //     if (storedUser) {
    //         setUser(JSON.parse(storedUser));
    //     } else {
    //         setUser(null);
    //     }
    // }, []);
    
    return(
        <>
            <Header user={user} />
            <main>
                <Outlet />
            </main>
        </>
    )
}

export default MainLayout;