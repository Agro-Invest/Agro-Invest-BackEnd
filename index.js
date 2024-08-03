import express from "express";
import expressOasGenerator from '@mickeymond/express-oas-generator';
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";

import { dbconnection } from "./config/db.js";
import userRouter from "./route/userRoute.js";

const app = express();

// ExpressOasGenerator ResponseHandler
expressOasGenerator.handleResponses(app, {
    alwaysServeDocs: true,
    tags: ['User', 'Farmers', 'Investor'],
    mongooseModels: mongoose.modelNames()
})

// Database connection
dbconnection();

// Middlewares
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL
    })
}));


// use routes
app.use('/api/v1', userRouter)

//ExpressOasGenerator requests
expressOasGenerator.handleRequests();
app.use((req, res) => res.redirect('/api-docs'));

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`Server started on port ${port}`);
})
