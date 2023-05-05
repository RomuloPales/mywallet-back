import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authroutes from './routes/authRoutes.js';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(authroutes);




const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});