import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from './../Context/AuthContext';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import './../Styles/Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { state, Logout } = useContext(AuthContext);
    const router = useNavigate();
    const sidebarRef = useRef(null);
    console.log(isOpen, "isOpe")

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };
    const logout = () => {
        Logout();
        setIsOpen(!isOpen);
        toast.success("Logout Successfull.")
    }

    const closeSidebarOnOutsideClick = (e) => {
        if (isOpen && sidebarRef.current && !sidebarRef.current.contains(e.target) && e.target.className !== 'sidebar-toggle') {
            setIsOpen(false);
        }
    };
    useEffect(() => {
        document.addEventListener('click', closeSidebarOnOutsideClick);
        return () => {
            document.removeEventListener('click', closeSidebarOnOutsideClick);
        };
    }, [isOpen])

    return (
        <>
            <div id='navbar'>
                <div id='navbar-1' onClick={() => router("/")}>
                    <i className="fa-solid fa-house cp"></i>
                </div>
                <div id='navbar-2'>
                    <p className='cp' onClick={() => router("/")}>HOME</p>
                    <p className='cp' onClick={() => router("/journey")}>THE JOURNEY</p>
                    <p className='cp' onClick={() => router("/team")}>TEAM</p>
                    <p className='cp' onClick={() => router("/store")}>STORE</p>
                    <p className='cp' onClick={() => router("/add-product")}>ADD PRODUCT</p>
                    <p className='cp' onClick={() => router("/contact")}>CONTACT</p>
                </div>
                <div id='navbar-3'>
                    {state?.user?.name ?
                        <p className='cp' onClick={logout}>{state?.user?.name}, LOGOUT ?</p> :
                        <p className='cp' onClick={() => router("/login")}>LOGIN / REGISTER</p>
                    }
                </div>
                <div id='navbar-4' >
                    <button onClick={toggleSidebar} className="sidebar-toggle">
                        ☰
                    </button>
                </div>
            </div >
            <div ref={sidebarRef} className={`sidebar ${isOpen ? 'open' : ''}`}>
                <p className='navSection' onClick={() => {
                    router("/");
                    setIsOpen(!isOpen);
                }}>HOME</p>
                <p className='navSection' onClick={() => {
                    router("/journey");
                    setIsOpen(!isOpen);
                }}>THE JOURNEY</p>
                <p className='navSection' onClick={() => {
                    router("/team");
                    setIsOpen(!isOpen);
                }}>TEAM</p>
                <p className='navSection' onClick={() => {
                    router("/store");
                    setIsOpen(!isOpen);
                }}>STORE</p>
                <p className='navSection' onClick={() => {
                    router("/add-product");
                    setIsOpen(!isOpen);
                }}>ADD PRODUCT</p>
                <p className='navSection' onClick={() => {
                    router("/contact");
                    setIsOpen(!isOpen);
                }}>CONTACT</p>
                {state?.user?.name ?
                    <p className='navSection' onClick={logout}>{state?.user?.name}, LOGOUT ?</p> :
                    <p className='navSection' onClick={() => {
                        router("/login");
                        setIsOpen(!isOpen);
                    }}>LOGIN / REGISTER</p>
                }
            </div>
        </>

    )
}

export default Navbar