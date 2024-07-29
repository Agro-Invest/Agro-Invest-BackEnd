import express from "express";
import { dbconnection } from "./config/db.js";

const app = express();

// Database connection
dbconnection();

// Middlewares
app.use(express.json());

const port = process.env.PORT || 8080;
app.listen(port, ()=>{
    console.log(`Server started on port ${port}`);
})
