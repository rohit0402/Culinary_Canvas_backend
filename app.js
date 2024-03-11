const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectionDB } = require("./connection");
require('dotenv').config();
const routes=require("./routes");


connectionDB();

app.use(express.json());
app.use(cookieParser()); 
app.use(cors({
    origin:"https://culinary-canvas-frontend.vercel.app", //"http://localhost:5173",
    credentials:true,
})); 
app.use("/api",routes);

app.listen(port, () => {
    console.log("Server is running on port", port);
});
