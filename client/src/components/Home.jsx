import React, { useContext } from 'react'
import { AuthContext } from './Context/AuthContext'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import './Styles/Home.css';

const Home = () => {
    const { state, Logout } = useContext(AuthContext);
    const router = useNavigate();
    const logout = () => {
        Logout();
        toast.success("Logout Successfull.")
    }

    return (
        <div id='home' >
            <h1 className='ta-c'>Welcome {state?.user?.name}
                {state?.user?.name && <button onClick={logout}>, Logout ?</button>}
            </h1>
            <button onClick={() => router('/add-product')} className='h-button'>Add Products ?</button>
            <button onClick={() => router('/store')} className='h-button'>Buy Products ?</button>
        </div >
    )
}

export default Home