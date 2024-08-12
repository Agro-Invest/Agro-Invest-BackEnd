import express from "express";
import cors from "cors";
import expressOasGenerator from '@mickeymond/express-oas-generator';
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import { dbconnection } from "./config/db.js";
import userRouter from "./route/userRoute.js";
import { projectRouter } from "./route/projectRoute.js";
import { fundingRouter } from "./route/fundingRoute.js";
import { farmerRouter } from "./route/farmerRoute.js";
import { accountBalanceRouter } from "./route/accountBalanceRoute.js";
import { preOrderRouter } from "./route/preOrderRoute.js";

const app = express();

// ExpressOasGenerator ResponseHandler
expressOasGenerator.handleResponses(app, {
    alwaysServeDocs: true,
    tags: ['Auth', 'FarmingProjects', "Farmer", "Fundings", "PreOrder", "Accounts", "Payment Systems"],
    mongooseModels: mongoose.modelNames()
})

// Database connection
dbconnection();

// Middlewares
app.use(express.json());
app.use(cors({credentials:true, origin:'*'}));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL
    })
}));

// use routes
app.use('/api/v1', userRouter);
app.use('/api/v1', projectRouter);
app.use('/api/v1', fundingRouter);
app.use('/api/v1', preOrderRouter);
app.use('/api/v1', farmerRouter);
app.use('/api/v1', accountBalanceRouter);

//ExpressOasGenerator requests
expressOasGenerator.handleRequests();
app.use((req, res) => res.redirect('/api-docs'));

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`Server started on port ${port}`);
})
