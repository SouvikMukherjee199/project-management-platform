import express from 'express';
import cors from 'cors';
const app = express();

import cookieParser from 'cookie-parser';

//basic configurations
app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))

//cookie parser
app.use(cookieParser())


//cors configuration
app.use(cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173", //["http://example.com", "http://site.com"]
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))

//route configuration
import healthCheckRouter from './routes/healthcheck.routes.js';
import authRouter from './routes/auth.routes.js';

app.use('/api/v1/healthcheck', healthCheckRouter);
app.use('/api/v1/auth/', authRouter);

app.get('/', (req,res)=>{
    res.send("Welcome to basecampy");
})

app.get('/about', (req,res)=>{
    res.send("Welcome to the about page");
})

export default app;