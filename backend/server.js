import express, { json }  from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import {notFound, errorHandler} from './middleware/errorMiddleware.js';
import cookieParser from 'cookie-parser';
import orderRoutes from './routes/orderRoutes.js'

connectDB();
dotenv.config();
const app=express();

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended : true }));

//cookie-parser middleware
app.use(cookieParser());

app.get('/',(req,res)=>{
    res.send("API is running...")
})

app.use('/api/products',productRoutes);
app.use('/api/users',userRoutes);
app.use('/api/orders',orderRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT=process.env.PORT || 5000
app.listen(PORT, console.log(`server is runing on ${process.env.NODE_ENV} mode on port ${PORT}`));

