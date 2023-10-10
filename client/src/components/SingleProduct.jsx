import React, { useContext, useEffect, useState } from 'react'
import './Styles/SingleProduct.css';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../helpers/AxiosConfig';
import toast from 'react-hot-toast';
import { AuthContext } from './Context/AuthContext';

const SingleProduct = () => {
    const [productData, setProductData] = useState({});
    const [cartProducts, setCartProducts] = useState([]);
    console.log(cartProducts, "cartProducts")
    const { id } = useParams();
    const router = useNavigate();
    const { state } = useContext(AuthContext)
    console.log(state, "state")

    async function AddToCart() {
        if (!state?.user?.userId) {
            return toast.error("Please Login to add products to cart.");
        }
        try {
            const response = await api.post('/user/add-cart', { productId: id, userId: state?.user?.userId })
            if (response.data.success) {
                toast.success(response.data.message)
                GetCartProducts();
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    async function GetProducts() {
        try {
            const response = await api.post('/product/get-single-product', { productId: id })
            if (response.data.success) {
                setProductData(response.data.product)
            }
        } catch (error) {
            console.log(error)
        }
    }
    async function GetCartProducts() {
        try {
            const response = await api.post('/user/get-cart-products', { userId: state?.user?.userId })
            if (response.data.success) {
                setCartProducts(response.data.cartProducts)
            }
        } catch (error) {
            console.log(error, "error here")
        }
    }
    useEffect(() => {
        if (id) {
            GetProducts();
        }
        if (state?.user?.userId) {
            GetCartProducts();
        } else {
            setCartProducts([]);
        }
    }, [id, state])
    return (
        <div id="store">
            <div id="store-main">
                {productData?.name ?
                    <div id="store-left">
                        <div id="left-1">
                            <i className="fa-solid fa-chevron-left fa-l"></i>
                            <h3>your design space </h3>
                        </div>
                        <div id="left-2" >
                            <div id="left-main-img" >
                                <div id="main-img">
                                    <img
                                        src={productData.image}
                                        alt="main"
                                    />
                                </div>
                                <div id="sub-imgs">
                                    <div id="sub-img">
                                        <img
                                            src={productData.image}
                                            alt="sub"
                                        />
                                    </div>
                                    <div id="sub-img">
                                        <img
                                            src={productData.image}
                                            alt="sub"
                                        />
                                    </div>
                                    <div id="sub-img">
                                        <img
                                            src={productData.image}
                                            alt="sub"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div id="left-main-desc">
                                <div id="left-header">
                                    <h2>{productData.name}</h2>
                                    <p>by {productData.userName} for you</p>
                                </div>
                                <div id="left-reviews">
                                    <div id="left-stars">
                                        <i className="fa-regular fa-star"></i>
                                        <i className="fa-regular fa-star"></i>
                                        <i className="fa-regular fa-star"></i>
                                        <i className="fa-regular fa-star"></i>
                                        <i className="fa-regular fa-star"></i>
                                    </div>
                                    <span>0 reviews</span>
                                </div>
                                <div id="left-price">
                                    <h4>Rs. {productData.price} /-</h4>
                                    <span>Get an exclusive 20% off shopping with HDFC bank</span>
                                </div>
                                <div id="left-angle">
                                    <div id="angle">
                                        <p>Front</p>
                                        <div id="boxes">
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                        </div>
                                    </div>
                                    <div id="angle">
                                        <p>Middle</p>
                                        <div id="boxes">
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                        </div>
                                    </div>
                                    <div id="angle">
                                        <p>Back</p>
                                        <div id="boxes">
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                        </div>
                                    </div>
                                    <div id="angle">
                                        <p>Sole</p>
                                        <div id="boxes">
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                        </div>
                                    </div>
                                </div>
                                <div id="left-size">
                                    <p>Size</p>
                                    <div id="size-number">
                                        <div><p>6</p></div>
                                        <div><p>7</p></div>
                                        <div><p>8</p></div>
                                        <div><p>9</p></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="left-3">
                            <div id="rate">
                                <p>Rate Product</p>
                                <div>
                                    <i className="fa-regular fa-star"></i>
                                    <i className="fa-regular fa-star"></i>
                                    <i className="fa-regular fa-star"></i>
                                    <i className="fa-regular fa-star"></i>
                                    <i className="fa-regular fa-star"></i>
                                </div>
                            </div>
                        </div>
                        <div id="left-4">
                            <button>Share design</button>
                            <button onClick={AddToCart}>Add to cart</button>
                        </div>
                    </div>
                    : <div>Loading...</div>}

                <div id="store-right">
                    <div id="cart-header">
                        <h2>CART</h2>
                        <i className="fa-solid fa-bag-shopping fa-xl"></i>
                    </div>
                    <div id="cart-body">
                        {cartProducts.length ? <div >
                            {cartProducts.map((product) => (
                                <div style={{ display: 'flex', justifyContent: 'space-evenly', height: '130px', marginBottom: "50px", cursor: 'pointer' }} onClick={() => router(`/single-product/${product._id}`)}>
                                    <div id='cartImg'>
                                        <img style={{ width: '100%', height: '100%' }} src={product.image} alt={product.name} />
                                    </div>
                                    <div style={{ width: "37%" }}>
                                        <h4 style={{ marginTop: '0px', marginBottom: "0px" }}>{product.name}</h4>
                                        <p style={{ marginTop: '0px', fontSize: "12px" }}>by {product.userName} for you</p>
                                        <p style={{ marginTop: '0px' }}>Rs. {product.price}/-</p>
                                    </div>
                                </div>
                            ))}
                        </div> : <div style={{ marginLeft: "50px", paddingTop: "200px" }}>
                            <p>What's stopping you, designer?</p>
                        </div>}

                        <div id="cart-address">
                            <div>
                                <i className="fa-solid fa-location-dot"></i>
                                <p>Home</p>
                            </div>
                            <div>
                                <i className="fa-regular fa-calendar"></i>
                                <p>Select Date</p>
                            </div>
                        </div>
                        <div id="cart-order">
                            <button>Order now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingleProduct