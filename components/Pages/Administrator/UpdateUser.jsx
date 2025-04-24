import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const UpdateUser = () => {

    const userData = useParams();
        
    const [userId] = useState(userData.userId);
    const [userdata, setUserdata] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        console.log("User ID", userId)
        axios.get(`http://localhost/wordpress-new/wp-json/custom/v1/user/${userId}`)
        .then((response) => {
            console.log("response.data", response.data)
            setUserdata(response.data);
            setLoading(false)
        })
        .catch((error) => {
            console.log("Error", error);
        })
    },[userId]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try{
            const resp = await axios.post("http://localhost/wordpress-new/wp-json/custom/v1/user/update", userdata);
            if(resp.status === 200){
                console.log("User updated successfully", resp.data);
                setLoading(false);
            }
        }
        catch(error){
            console.log("Error", error)
        }
        finally {
            setLoading(false)
        };
    }

    const handleFormChange = (event) => {
        setUserdata({ ...userdata, [event.target.id]: event.target.value });
    }

    return(
        <div className="container">
            <div className="row">
                <h2 className="text-center">Update User</h2>
                {!loading && (
                    <form onSubmit={handleFormSubmit}>
                        <div className="form-group mt-4">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" id="email" name="email" placeholder="Enter email" onChange={handleFormChange} value={userdata.email} />
                        </div>
                        <div className="form-group mt-4">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" id="password" name="password" onChange={handleFormChange} placeholder="Enter password" />
                        </div>
                        <div className="form-group mt-4">
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" className="form-control" id="first_name" name="first_name" onChange={handleFormChange} placeholder="First Name" value={userdata.first_name} />
                        </div>
                        <div className="form-group mt-4">
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" className="form-control" id="last_name" name="last_name" onChange={handleFormChange} placeholder="Last Name" value={userdata.last_name} />
                        </div>
                        <button type="submit" className="btn btn-primary mt-4">Update User</button>
                    </form>
                )}
            </div>
        </div>
    )
}

export default UpdateUser;