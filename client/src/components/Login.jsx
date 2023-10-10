import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from './Context/AuthContext';
import api from './../helpers/AxiosConfig';

const Login = () => {
  const { login, state } = useContext(AuthContext);
  const [userData, setUserData] = useState({ email: "", password: "" })
  const router = useNavigate();

  const handleChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (userData.email && userData.password) {
      try {
        const response = await api.post("/user/login", {
          email: userData.email,
          password: userData.password
        })
        if (response.data.success) {
          login({ token: response.data.token, payload: response.data.user })
          toast.success(response.data.message)
          router('/');
          setUserData({ email: "", password: "" })
        }
      } catch (error) {
        toast.error(error.response.data.message)
      }
    } else {
      alert("Please fill the all fields..")
    }
  }

  useEffect(() => {
    if (state?.user?.name) {
      router("/")
      toast("You are already Logged in.")
    }
  }, [state, router])

  return (
    <div>
      <h1 style={{ textAlign: 'center', marginTop: "50px" }}>Login</h1>
      <form onSubmit={handleSubmit} style={{ width: "20%", margin: "auto" }}>
        <fieldset>
          <legend>Add Details here :</legend>
          <label>Email </label><br />
          <input value={userData.email} type='email' onChange={handleChange} name="email" /><br />
          <label>Password</label><br />
          <input value={userData.password} type='password' onChange={handleChange} name='password' /><br />
          <input type='submit' value="Login" /><br />
        </fieldset>
      </form>
      <button style={{ width: "80px", marginLeft: '630px', marginTop: "20px" }} onClick={() => router('/register')}>Register ?</button>
    </div>
  )
}

export default Login