import { useContext } from "react";
import UserDashboard from "./Subscriber/userDashboard";
import AdminDashboard from "./Administrator/adminDashboard";
import LoginContext from "../../LoginContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const {user, setUser} = useContext(LoginContext)
    const navigate = useNavigate();
    const logoutUser = () => {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login');
    }

    if (!user) return <p>Loading...</p>;

    return(
        <>
        {user.role === 'subscriber' && 
            <UserDashboard user={user} logoutUser={logoutUser} />
        }

        {user.role === 'administrator' &&
            <AdminDashboard user={user} logoutUser={logoutUser} />
        }
        </>
    )
}

export default Dashboard;