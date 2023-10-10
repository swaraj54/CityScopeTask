import React, { useContext, useEffect, useState } from "react";
import "./Styles/AllProducts.css";
import { FaFilter } from "react-icons/fa6";
import { AiOutlineSearch } from "react-icons/ai";
import { BsFillCartCheckFill } from "react-icons/bs";
import { CiCalendar, CiLocationOn } from "react-icons/ci";
import api from './../helpers/AxiosConfig';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./Context/AuthContext";

const AllProducts = () => {
    const [allProductsData, setAllProductsData] = useState([])
    const [allProducts, setAllProducts] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [selectedCostRanges, setSelectedCostRanges] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [cartProducts, setCartProducts] = useState([]);
    const { state } = useContext(AuthContext)
    console.log(allProducts, "allProducts")
    const router = useNavigate();
    // Filter function for Type
    const filterByType = (product) => {
        if (selectedTypes.length === 0) return true; // No filters selected, show all products

        const productType = product.type.toLowerCase();
        return selectedTypes.includes(productType); // Assuming 'type' property exists in product objects
    };
    // Filter function for Cost
    const filterByCost = (product) => {
        if (selectedCostRanges.length === 0) return true; // No filters selected, show all products
        const productCost = product.price;
        return selectedCostRanges.some((range) => {
            const [min, max] = range.split('-').map(Number);
            return productCost >= min && productCost <= max;
        });
    };
    // Filter function for Color
    const filterByColor = (product) => {
        if (selectedColors.length === 0) return true; // No filters selected, show all products
        const productColor = product.color.toLowerCase();
        return selectedColors.includes(productColor);
    };
    // Apply filters and update the displayed products
    const applyFilters = () => {
        const filteredProducts = allProductsData.filter((product) => {
            return (
                filterByType(product) &&
                filterByCost(product) &&
                filterByColor(product)
            );
        });
        console.log(filteredProducts, "filteredProducts")

        setAllProducts(filteredProducts);
    };
    // Handle checkbox changes
    const handleTypeChange = (event) => {
        const { value, checked } = event.target;
        setSelectedTypes((prevSelectedTypes) =>
            checked
                ? [...prevSelectedTypes, value]
                : prevSelectedTypes.filter((type) => type !== value)
        );
    };
    const handleCostChange = (event) => {
        const { value, checked } = event.target;
        setSelectedCostRanges((prevSelectedCostRanges) =>
            checked
                ? [...prevSelectedCostRanges, value]
                : prevSelectedCostRanges.filter((range) => range !== value)
        );
    };
    const handleColorChange = (event) => {
        const {  style } = event.target;
        const color = style.backgroundColor;
        setSelectedColors((prevSelectedColors) =>
            prevSelectedColors.includes(color)
                ? prevSelectedColors.filter((c) => c !== color)
                : [...prevSelectedColors, color]
        );
    };
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
        async function GetProducts() {
            try {
                const response = await api.get('/product/get-products')
                if (response.data.success) {
                    setAllProductsData(response.data.products)
                    setAllProducts(response.data.products)
                }
            } catch (error) {
                console.log(error)
            }
        }
        if (state?.user?.userId) {
            GetCartProducts();
        } else {
            setCartProducts([]);
        }
        GetProducts();
    }, [state,GetCartProducts])
    return (
        <>
            <div className="respFiltCart">
                <h3>Filter</h3>
                <h3>Cart</h3>
            </div>
            <div className="storeMainContainer">
                <div className="leftStoreContainer">
                    <div className="filterNav">
                        <h2>FILTERS</h2>
                        <div className="filterIcon">
                            <FaFilter />
                        </div>
                    </div>

                    <div className="cost">
                        <h2>Cost</h2>
                        <div className="checkBoxMainContainer">
                            <div className="checkBoxSingle">
                                <input className="cp" id='first' type="checkbox" value="1500-4000" onChange={handleCostChange} />
                                <label className="cp" for='first'>Rs. 1500-4000</label>
                            </div>
                            <div className="checkBoxSingle">
                                <input className="cp" id='second' type="checkbox" value="4001-7000" onChange={handleCostChange} />
                                <label className="cp" for='second'>Rs. 4001-7000</label>
                            </div>
                            <div className="checkBoxSingle">
                                <input className="cp" id='third' type="checkbox" value="7001-100000" onChange={handleCostChange} />
                                <label className="cp" for='third'>Rs. 7001+</label>
                            </div>
                        </div>
                    </div>
                    <div className="color">
                        <h2>Color</h2>
                        <div className="colorMainContainer">
                            <div className="allSingleColor cp" id="red" style={{ backgroundColor: 'white', border: "1px solid grey" }} onClick={handleColorChange}></div>
                            <div className="allSingleColor cp" id="blue" style={{ backgroundColor: 'blue' }} onClick={handleColorChange}></div>
                            <div className="allSingleColor cp" id="green" style={{ backgroundColor: 'green' }} onClick={handleColorChange}></div>
                            <div className="allSingleColor cp" id="yellow" style={{ backgroundColor: 'black' }} onClick={handleColorChange}></div>
                            <div className="allSingleColor cp" id="pink" style={{ backgroundColor: 'orange' }} onClick={handleColorChange}></div>
                        </div>
                    </div>

                    <div className="cost">
                        <h2>Design Templates</h2>
                        <div className="checkBoxMainContainer">
                            <div className="checkBoxSingle">
                                <input type="checkbox" disabled />
                                <p>2</p>
                            </div>
                            <div className="checkBoxSingle">
                                <input type="checkbox" disabled />
                                <p>3</p>
                            </div>
                            <div className="checkBoxSingle">
                                <input type="checkbox" disabled />
                                <p>+</p>
                            </div>
                        </div>
                    </div>

                    <div className="cost">
                        <h2>Type</h2>
                        <div className="checkBoxMainContainer">
                            <div className="checkBoxSingle cp">
                                <input type="checkbox" value="loafers" onChange={handleTypeChange} />
                                <p>Loafers</p>
                            </div>
                            <div className="checkBoxSingle cp">
                                <input type="checkbox" value="sneakers" onChange={handleTypeChange} />
                                <p>Sneakers</p>
                            </div>
                        </div>
                    </div>
                    <button onClick={applyFilters} className="apply">Apply</button>
                </div>
                <div className="centerStoreContainer">
                    <div className="centernav">
                        <div className="centerLeftNav" style={{ marginLeft: "-45px" }}>
                            <h2>SHOES</h2>
                        </div>
                        <div className="centerRightNav">
                            <div className="searchIcon">
                                <AiOutlineSearch />
                            </div>
                            <button>Sort By</button>
                        </div>
                    </div>

                    <div className="centermainSection">
                        {allProducts.length ? <>
                            {allProducts.map((product) => (
                                <div className="singleProductContainer" key={product._id} onClick={() => router(`/single-product/${product._id}`)}>
                                    <div className="singleProdImage">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                        />
                                    </div>

                                    <div className="singleProdDetails">
                                        <h3 className="mt-1">{product.name}</h3>
                                        <div className="singleProdDetailsLast m-0">
                                            <p className="m-0">Rs.{product.price}/-</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                            }
                        </>
                            : <div>No Products Found..</div>}
                    </div>
                </div>
                <div className="rightStoreContainer">
                    <div className="rightNav">
                        <h2>CART</h2>
                        <div className="cartIcon">
                            <BsFillCartCheckFill />
                        </div>
                    </div>

                    <div id="cart-body">
                        {cartProducts.length ? <div >
                            {cartProducts.map((product) => (
                                <div id='storemap' onClick={() => router(`/single-product/${product._id}`)}>
                                    <div id='storemapDiv1'>
                                        <img id='storeImage' src={product.image} alt={product.name} />
                                    </div>
                                    <div id='storemapDiv2'>
                                        <h4 >{product.name}</h4>
                                        <p >by {product.userName} for you</p>
                                        <p >Rs. {product.price}/-</p>
                                    </div>
                                </div>
                            ))}
                        </div> : <div id='storeEmpty'>
                            <p>What's stopping you, designer?</p>
                        </div>}

                        <div className="rightLastSection">
                            <div className="rightLastDown">
                                <div>
                                    <CiLocationOn />
                                </div>
                                <p>Home</p>
                            </div>
                            <div className="rightLastDown">
                                <div>
                                    <CiCalendar />
                                </div>
                                <p>Select Date</p>
                            </div>
                        </div>
                        <div >
                            <button className="apply">Order Now</button>
                        </div>
                    </div>

                </div>
            </div >
        </>
    );
};

export default AllProducts