import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import router from './routes/index.js';
import mongoose from 'mongoose';

const app = express();
app.use(cors());
dotenv.config();
app.use(express.json());
app.use(morgan("dev"));
app.get("/", (req, res) => {
    res.send("Welcome to City Scope.")
})
app.use('/api/v1', router);
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Connected to Database.💎")
})
app.listen(8000, () => {
    console.log("Server is running on 8000.🚀")
})