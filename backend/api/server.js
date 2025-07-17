import express from 'express'
const app = express();
import serverless from 'serverless-http'
import dotenv from "dotenv"
dotenv.config();
import cookieparser from 'cookie-parser';
import userRoutes from '../routes/UserRoutes.js'
import cors from "cors"
import { connectDB } from '../utils/db.js';


//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser())
app.use(cors({
    origin: "https://perfume-project-phi.vercel.app/", // your frontend origin
    credentials: true,               // allow cookies/credentials
}))



//api
app.use('/user', userRoutes);
app.get("/", (req, res) => {
  res.send("Hello from backend!");
});



export default serverless(app)