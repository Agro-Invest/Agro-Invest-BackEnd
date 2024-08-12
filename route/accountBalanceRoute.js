import { Router } from "express";
import { checkAccountBalance } from "../controller/accountBalanceController.js";
import { isAuthenticated } from "../middleware/authn.js";
import { hasPermission } from "../middleware/authz.js";

export const accountBalanceRouter = Router();
accountBalanceRouter.get('/accounts/application-wallet', isAuthenticated, hasPermission("checkBalance"), checkAccountBalance);