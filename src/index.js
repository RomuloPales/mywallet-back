import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authroutes from './routes/authRoutes.js';
import transactionsRoutes from './routes/transactionsRoutes.js';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(authroutes);
app.use(transactionsRoutes);




const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});