import { useEffect, useState } from "react";
import UserDashboard from "./Subscriber/userDashboard";
import AdminDashboard from "./Administrator/adminDashboard";
import Header from "../Sections/header";

const Dashboard = () => {
    const [user, setUser] = useState(null);

    useEffect(()=>{
        setUser(JSON.parse(localStorage.getItem("user")));
    },[]);

    if (!user) return <p>Loading...</p>;

    return(
        <>
        <Header />
        {user.role === 'subscriber' && 
            <UserDashboard user={user} />
        }

        {user.role === 'administrator' &&
            <AdminDashboard user={user} />
        }
        </>
    )
}

export default Dashboard;