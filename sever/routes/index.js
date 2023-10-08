import express from "express";
import productRoutes from './Product.routes.js';
import userRoutes from './User.routes.js'

const router = express.Router();

router.use('/product', productRoutes);
router.use('/user', userRoutes);

export default router;