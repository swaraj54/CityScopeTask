import UserModel from "../models/User.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!password) return res.status(401).json({ success: false, message: "Password is required." });
        if (!email) return res.status(401).json({ success: false, message: "Email is required." });

        const user = await UserModel.findOne({ email })
        if (user) {
            const isPasswordCorrect = bcrypt.compare(user.password, password)
            if (isPasswordCorrect) {
                const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET)
                const userData = { name: user.name, email: user.email, userId: user._id }
                return res.status(200).json({
                    success: true,
                    message: "Login Successfull.",
                    user: userData,
                    token: token
                })
            }
            return res.status(404).json({
                success: false,
                message: "Email or Password is wrong."
            })
        }
        return res.status(404).json({
            success: false,
            message: "Email or Password is wrong."
        })
    } catch (error) {
        console.log(error, "error")
        return res.status(500).json({
            success: false,
            message: error
        })
    }
}
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) return res.status(401).json({ success: false, message: "All fields are required!" })
        const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if (!password.match(passwordPattern)) {
            return res.status(401).json({
                success: false,
                message:
                    'Password must be at least 8 characters long and contain at least one uppercase letter, one digit, and one special character (!@#$%^&*).',
            });
        }
        const encryptedPassword = await bcrypt.hash(password, 10);
        const user = new UserModel({ name, email, password: encryptedPassword })
        await user.save();
        return res.status(201).json({ success: true, message: "Registration Successfully done." })
    } catch (error) {
        return res.status(500).json({ success: false, message: error })
    }
}

export const getCurrentUser = async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) return res.status(404).json({ success: false, message: "Token is required." })

        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedData) return res.status(404).json({ success: false, message: "Token is not valid." })

        const userId = decodedData.userId;
        const user = await UserModel.findById(userId);
        if (user) {
            const userObject = { name: user.name, email: user.email, userId: user._id }
            return res.status(200).json({ success: true, user: userObject })
        }
        return res.status(404).json({ success: false, message: "User not found." })
    } catch (error) {
        return res.status(500).json({ success: false, message: error })
    }
}


export const addCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;
        if (!userId || !productId) return res.status(400).json({ success: false, message: "All fields are mandtory." })

        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }
        if (!isProductInCart) {
            user.cart.push(productId);
            await user.save();
            return res.status(200).json({ success: true, message: "Product added to the cart successfully.", user });
        } else {
            return res.status(400).json({ success: false, message: "Product is already in the cart." });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: error })
    }
}

export const removeCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;
        if (!userId || !productId) {
            return res.status(400).json({ success: false, message: "Both userId and productId are required." });
        }
        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }
        const productIndex = user.cart.findIndex(item => item.toString() === productId);

        if (productIndex !== -1) {
            user.cart.splice(productIndex, 1);
            await user.save();

            return res.status(200).json({ success: true, message: "Product removed from the cart successfully.", user });
        } else {
            return res.status(400).json({ success: false, message: "Product is not in the cart." });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};