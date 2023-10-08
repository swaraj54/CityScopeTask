import express from "express";
import { addCart, getCurrentUser, login, register, removeCart } from "../controllers/User.controllers.js";
const router = express.Router();

router.post("/login", login)
router.post("/register", register)
router.post("/get-current-user", getCurrentUser)
router.post("/add-cart", addCart)
router.post("/remove-cart", removeCart)

export default router;
