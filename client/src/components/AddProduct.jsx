import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import api from './../helpers/AxiosConfig.js'
import { AuthContext } from './Context/AuthContext.jsx';

const AddProduct = () => {
    const [userData, setUserData] = useState({ name: "", price: "", image: "", color: "", type: "sneakers" });
    const { state } = useContext(AuthContext)
    const router = useNavigate();

    const handleChange = (event) => {
        setUserData({ ...userData, [event.target.name]: event.target.value })
    }
    const handleChangeForType = (event) => {
        setUserData({ ...userData, "type": event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!state?.user?.userId) {
            return toast.error("Please Login to Add Products.")
        }
        console.log(userData, "userData here")
        if (userData.name && userData.price && userData.image && userData.color && userData.type) {
            try {
                const response = await api.post("/product/add-product", {
                    name: userData.name,
                    price: userData.price,
                    image: userData.image,
                    color: userData.color,
                    type: userData.type,
                    userId: state?.user?.userId
                })
                if (response.data.success) {
                    toast.success(response.data.message)
                    setUserData({ name: "", price: "", image: "", color: "", type: "sneakers" })
                    router('/store');
                }
            } catch (error) {
                toast.error(error.response.data.message)
            }
        } else {
            toast.error("Please fill the all fields.")
        }
    }

    useEffect(() => {
        if (!state?.user?.userId) {
            toast.error("Please login to add products.")
        }
    }, [state])
    return (
        <div >
            <h1 style={{ textAlign: 'center', marginTop: "50px" }}>Add Product</h1>
            <form onSubmit={handleSubmit} style={{ width: "20%", margin: "auto" }}>
                <fieldset>
                    <legend>Add Details here :</legend>
                    <label>Name :</label><br />
                    <input value={userData.name} type='text' onChange={handleChange} name="name" required /><br />
                    <label>Price :</label><br />
                    <input value={userData.price} type='number' onChange={handleChange} name='price' required /><br />
                    <label>Image (url) :</label><br />
                    <input value={userData.image} type='url' onChange={handleChange} name='image' required /><br />
                    <label>Color :</label><br />
                    <input value={userData.color} type='text' onChange={handleChange} name='color' required /><br />
                    <label>Type :</label><br />
                    <select onChange={handleChangeForType}>
                        <option value="sneakers">Sneakers</option>
                        <option value="loafers">Loafers</option>
                    </select><br />
                    <hr />
                    <input type='submit' value='Add Product' /><br />
                </fieldset>
            </form>
        </div>
    )
}

export default AddProduct