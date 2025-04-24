import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UsersList = () => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        const fetchUser = async () => {
            try{
                const usersList = await axios.get("http://localhost/wordpress-new/wp-json/custom/v1/users");
                console.log("usersList", usersList);
                setUsers(usersList.data.users);
                setLoading(false);
            }catch(error){
                console.log(error);
                setError(error.response.data.message);
            }
        }

        fetchUser();
    },[]);

    const deleteUser = async (userId) => {
        const deleteConfirm = window.confirm("Are you really want to delete this user?");
        if(deleteConfirm){
            try{
                await axios.delete(`http://localhost/wordpress-new/wp-json/custom/v1/user-delete/${userId}`);
                setUsers(users.filter(user => user.id !== userId));
                console.log(`User with ID ${userId} deleted successfully`);
            }catch(error){
                console.log("Error:", error.response.data.message)
                setError(error.response.data.message);
            }
        }
        
    }

    return(
        <>
        {(loading) ? 'Loading...' : (
            <div className="container mt-4">
                <div className="row">
                    {(error) ? <div className="alert alert-danger">{error}</div> : ''}
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Role</th>
                                <th colspan="2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={index}>
                                    <td>{user.email}</td>
                                    <td>{user.first_name}</td>
                                    <td>{user.last_name}</td>
                                    <td>{user.role}</td>
                                    <td><Link to={`/dashboard/users/update-user/${user.id}`}>update</Link></td>
                                    <td><Link to="#" onClick={() => deleteUser(user.id)}>delete</Link></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )}
        </>
    )
}

export default UsersList;