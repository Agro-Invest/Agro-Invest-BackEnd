import { Router } from "express";
import { fundProject, projectsInvestedInByUser, checkFundingAccount } from "../controller/fundController.js";
import { isAuthenticated } from "../middleware/authn.js";
import { hasPermission } from "../middleware/authz.js";

export const fundingRouter = Router();
fundingRouter.post('/Investment/fundproject/:id', isAuthenticated, hasPermission("fundProject"), fundProject);
fundingRouter.get('/Investment/projectfundedbyuser', isAuthenticated, hasPermission('getProjectsYouInvestedIn'), projectsInvestedInByUser);
fundingRouter.get('/accounts/fundingaccount', isAuthenticated, hasPermission("checkFundingAccount"), checkFundingAccount)