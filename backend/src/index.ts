import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db';
import userRoutes from './routes/userRoutes'
import blogRoutes from './routes/blogRoutes'

const app = express();

connectDB();

app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use('/api',userRoutes)
app.use('/api',blogRoutes)

const port = process.env.PORT || 5000;

app.get('/',(req,res)=>{
    res.send("Hello")
});

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
    
})
