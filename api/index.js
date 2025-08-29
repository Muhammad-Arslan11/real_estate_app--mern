import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import connect_to_db from './db/connection.js';

const app = express();
dotenv.config();
app.use(express.json());
app.use('/users', userRouter);
app.use('/auth', authRouter);


const mongo_URL =process.env.mongodb_url;
connect_to_db(mongo_URL);
const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`app is running on port: ${PORT}`);
})