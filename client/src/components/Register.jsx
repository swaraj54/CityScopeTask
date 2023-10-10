import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import api from './../helpers/AxiosConfig.js'
import { AuthContext } from './Context/AuthContext.jsx';

const Register = () => {
    const [userData, setUserData] = useState({ name: "", email: "", password: "" });
    const { state } = useContext(AuthContext)
    const router = useNavigate();

    const handleChange = (event) => {
        setUserData({ ...userData, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (userData.name && userData.email && userData.password) {
            try {
                const response = await api.post("/user/register", {
                    name: userData.name,
                    email: userData.email,
                    password: userData.password
                })
                if (response.data.success) {
                    toast.success(response.data.message)
                    setUserData({ name: "", email: "", password: "" })
                    router('/login');
                }
            } catch (error) {
                toast.error(error.response.data.message)
            }
        } else {
            toast.error("Please fill the all fields.")
        }
    }
    useEffect(() => {
        if (state?.user?.name) {
            router("/")
            toast("You are already Logged in.")
        }
    }, [state])

    return (
        <div>
            <h1 style={{ textAlign: 'center', marginTop: "50px" }}>Register</h1>
            <form onSubmit={handleSubmit} style={{ width: "20%", margin: "auto" }}>
                <fieldset>
                    <legend>Add Details here :</legend>
                    <label>Name :</label><br />
                    <input value={userData.name} type='text' onChange={handleChange} name="name" required /><br />
                    <label>Email :</label><br />
                    <input value={userData.email} type='email' onChange={handleChange} name='email' required /><br />
                    <label>Password :</label><br />
                    <input value={userData.password} type='password' onChange={handleChange} name='password' required /><br />
                    <p style={{ fontSize: '8px' }}>Password must be at least 8 characters long and contain at least one uppercase letter, one digit, and one special character (!@#$%^&*).</p>
                    <input type='submit' value='Register' /><br />
                </fieldset>
            </form>
            <button style={{ width: "80px", marginLeft: '630px', marginTop: "20px" }} onClick={() => router('/login')}>Login ?</button>
        </div>
    )
}

export default Register