import express from "express";
import { addProduct, getProducts, getSingleProduct } from "../controllers/Product.controllers.js";
const router = express.Router();

router.get("/get-products", getProducts)
router.post("/add-product", addProduct)
router.post("/get-single-product", getSingleProduct)

export default router;