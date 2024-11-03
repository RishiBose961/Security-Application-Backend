//Packages
import express from "express";
import "dotenv/config.js";
import cookieParser from "cookie-parser";

//Import URL
import connectDB from "./db/config.js";
import { errorHandler, notFound } from "./utils/errorMiddleware.js";

//Routes
import userRoutes from "./router/user.route.js";



//Connecting To DataBase
connectDB()

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended:true}))
app.use(cookieParser())


//Connecting To PORT
const port = process.env.PORT || 5000;


app.get("/", (req, res) => res.send("server is ready"));


//Backend Routes
app.use("/api/auth", userRoutes);


app.use(notFound);
app.use(errorHandler);



app.listen(port, () => {
  console.log(`Starting server on port ${port}`);
});
