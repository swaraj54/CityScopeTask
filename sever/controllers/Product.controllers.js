import ProductModal from './../models/Product.model.js';
import UserModal from './../models/User.model.js';

export const getProducts = async (req, res) => {
    try {
        const response = await ProductModal.find({});
        if (response) {
            return res.status(200).json({ success: true, products: response });
        } else {
            return res.status(404).json({ success: false, message: "No Products Found!" });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: error });
    }
}


export const addProduct = async (req, res) => {
    try {
        const { name, price, image, color, type, userId } = req.body;
        if (!name || !price || !image || !color || !type || !userId) return res.status(401).json({ success: false, message: "All fields are mandtory!" });
        const userName = await UserModal.findById(userId).select("name");
        if (!userName) return res.status(401).json({ success: false, message: "User not found!" });
        const product = new ProductModal({
            name,
            price,
            image,
            color,
            type,
            userName: userName.name,
            userId
        })
        await product.save();

        return res.status(201).json({ success: true, message: "Product added successfully." });
    } catch (error) {
        return res.status(500).json({ success: false, message: error });
    }
}

export const getSingleProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        if (!productId) return res.status(401).json({ success: false, message: "Product ID is required!" });
        const response = await ProductModal.findById(productId).exec();
        if (response) {
            return res.status(200).json({ success: true, product: response });
        }
        return res.status(404).json({ success: false, message: "No Product Found!" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error });
    }
}