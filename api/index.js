import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/apiRoutes.js';
import connect_to_db from './db/connection.js';

const app = express();
dotenv.config();
app.use('/', router);


const mongo_URL =process.env.mongodb_url;
connect_to_db(mongo_URL);
const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`app is running on port: ${PORT}`);
})