import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import connect_to_db from './db/connection.js';

const app = express();
dotenv.config();
app.use(express.json());
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);

app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "internal server error";
    return res.status(statusCode).json({
        succsess: false,
        statusCode: statusCode,
        message: message
    });
})

const mongo_URL =process.env.mongodb_url;
connect_to_db(mongo_URL);
const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`app is running on port: ${PORT}`);
})