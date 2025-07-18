import express from 'express'
const app = express();
import dotenv from "dotenv"
dotenv.config();
import cookieparser from 'cookie-parser';
import userRoutes from './routes/UserRoutes.js'
import cors from "cors"
import { connectDB } from './utils/db.js';


//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser())

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:4028/"
]
app.use(cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    }, // your frontend origin
    credentials: true,               // allow cookies/credentials
}))



//api
app.use('/user', userRoutes);
app.get("/", (req, res) => {
  res.send("Hello from backend!");
});


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    connectDB()
    console.log(`Server running on PORT ${PORT}`);
})
