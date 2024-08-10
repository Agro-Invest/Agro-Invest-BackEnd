import { Router } from "express";
import { checkAccountBalance } from "../controller/accountBalanceController.js";

export const accountBalanceRouter = Router();
accountBalanceRouter.get('/user/accountbalance', checkAccountBalance);