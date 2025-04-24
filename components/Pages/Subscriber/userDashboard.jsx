import { useNavigate } from "react-router-dom";

const UserDashboard = ({ user }) => {
    const navigate = useNavigate();
    const logoutUser = () => {
        localStorage.removeItem('user');
        navigate('/login');
    }
    return(
        <div className="container">
            <div className="row mt-4">
                <div className="col-md-10">
                    <h2>Welcome {user.first_name} {user.last_name}</h2>
                    <h5>User Role is {user.role}</h5>
                </div>
                <div className="col-md-2">
                    <div className="list-group">
                        <button onClick={logoutUser} type="button" className="text-center list-group-item list-group-item-action">Logout</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserDashboard;