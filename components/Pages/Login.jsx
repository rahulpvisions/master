import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const value = e.target.value;
        setData((prevData) => ({ ...prevData, [e.target.name]: value }));
    }

    const loginUser = async (e) => {
        e.preventDefault();
        const { email, password } = data;
        if(email === "" || password === ""){
            setErrors("Please fill in all fields");
        } else {
            setLoading(true);
            await axios.post('http://localhost/wordpress-new/wp-json/custom/v1/login',data)
            .then((response) => {
                console.log(response);
                if(response.status === 200){
                    setLoading(false);
                    localStorage.setItem("user", JSON.stringify(response.data.user));
                    navigate("/dashboard")
                }
            })
            .catch((error) => {
                console.log(error)
                setLoading(false);
                setErrors(error.response.data.message)
            });
        }
    }
    return(
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="text-center mb-4">Login</h2>
                            {(errors) ? (
                                <div className="alert alert-danger" role="alert">
                                    {errors}
                                </div>
                            ) : ''}
                            <form onSubmit={loginUser}>
                                <div className="form-group mb-4">
                                    <label for="email">Email:</label>
                                    <input type="email" onChange={handleChange} className="form-control" id="email" placeholder="Enter email
                                    " name="email"/>                                        
                                </div>
                                <div className="form-group mb-4">
                                    <label for="password">Password:</label>
                                    <input type="password" onChange={handleChange} className="form-control" id="password" placeholder="Enter password
                                    " name="password"/>
                                </div>
                                <button type="submit" className="btn btn-primary">{(loading) ? 'Loading' : 'Login'}</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
