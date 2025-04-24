import axios from "axios";
import { useRef, useState } from "react";

const Register = () => {
    const [data, setData] = useState({
        email: '',
        password: '',
        cfmpassword: '',
        fname: '',
        lname: ''
    })

    const [userEmailError, setUserEmailError] = useState(false);
    const [errors, setErrors] = useState(null);
    const [success, setSuccess] = useState(null);
    const emailReference = useRef(null);
    
    const validateEmail = () =>{
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(emailRegex.test(data.email)){
            setUserEmailError(false)
        }else{
            emailReference.current.focus();
            setUserEmailError(true)
        }
    }

    const handleChange = (e) => {
        const value = e.target.value;
        if(e.target.type === 'text'){
            //check text only regex
            const textRegex = /^[a-zA-Z\s]*$/;
            if (!textRegex.test(value)) {
                setErrors('Only letters are allowed in text fields!');
                return;
            } else {
                setErrors(null); // clear previous error
            }
        }
        setData({...data, [e.target.name]: value});
    }
    const registerUser = (event) => {
        event.preventDefault();
        if(data.email && data.password && data.cfmpassword && data.fname && data.lname){
            if(data.cfmpassword === data.password){
                axios.post('http://localhost/wordpress-new/wp-json/custom/v1/register',data)
                .then((response) => {
                    console.log(response)
                    if(response.status === 200){
                        setSuccess('User registered successfully! You can proceed to login')
                        setData({
                            email: '',
                            password: '',
                            cfmpassword: '',
                            fname: '',
                            lname: ''
                        })
                        setErrors(null)
                    }
                })
                .catch((error)=>{
                    console.log(error)
                    setErrors(error.response.data.message)
                    setSuccess(null)
                });
            }else{
                setErrors("Passwords do not match");
                setSuccess(null)
                return false;
            }
        }else{
            setErrors("Please fill in all fields");
            setSuccess(null)
            return false;
        }
    }

    return(       
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="text-center mb-4">Register</h2>
                            {(errors) ? (
                                <div className="alert alert-danger" role="alert">
                                    {errors}
                                </div>
                            ) : ''}
                            {(success) ? (
                                <div className="alert alert-success" role="alert">
                                    {success}
                                </div>
                            ) : ''}
                            <form onSubmit={registerUser}>
                                <div className="row mb-4">
                                    <div className="form-group">
                                        <label for="email">Email:</label>
                                        <input ref={emailReference} type="email" onBlur={validateEmail} onChange={handleChange} className={`form-control ${(userEmailError) ? 'error' : ''}`} id="email" placeholder="Enter email
                                        " name="email" value={data.email} />
                                    </div>
                                </div>
                                
                                <div className="row mb-4">
                                    <div className="form-group col-md-6">
                                        <label for="password">Password:</label>
                                        <input type="password" className="form-control" onChange={handleChange} id="password" placeholder="Enter password
                                        " name="password" value={data.password} />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label for="cfmpassword">Confirm Password:</label>
                                        <input type="password" className="form-control" onChange={handleChange} id="cfmpassword" placeholder="Enter Confirm password
                                        " name="cfmpassword" value={data.cfmpassword} />
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="form-group col-md-6">
                                        <label for="fname">First Name:</label>
                                        <input type="text" className="form-control" id="fname" onChange={handleChange} placeholder="Enter First Name
                                        " name="fname" value={data.fname} />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label for="lname">Last Name:</label>
                                        <input type="text" className="form-control" id="lname" onChange={handleChange} placeholder="Enter Last Name
                                        " name="lname" value={data.lname} />
                                    </div>
                                </div>
                                
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;
