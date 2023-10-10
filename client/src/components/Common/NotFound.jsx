import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    const router = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            router('/')
        }, 3000)
    }, [])
    return (
        <div>Opps, Page Not Found, Redirecting you to home page in 3 sec.</div>
    )
}

export default NotFound