import { Router } from "express";
import { fundProject, projectsInvestedInByUser, checkFundingAccount } from "../controller/fundController.js";
import { isAuthenticated } from "../middleware/authn.js";
import { hasPermission } from "../middleware/authz.js";

export const fundingRouter = Router();
fundingRouter.post('/user/fundproject/:id', isAuthenticated, hasPermission("fundProject"), fundProject);
fundingRouter.get('/user/projectsinvestedinbyuser', isAuthenticated, hasPermission('getProjectsYouInvestedIn'), projectsInvestedInByUser);
fundingRouter.get('/user/checkfundingaccount', isAuthenticated, hasPermission("checkFundingAccount"), checkFundingAccount)