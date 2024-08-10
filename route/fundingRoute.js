import { Router } from "express";
import { fundProject, projectsInvestedInByUser, checkFundingAccount } from "../controller/fundController.js";

export const fundingRouter = Router();
fundingRouter.post('/user/fundproject', fundProject);
fundingRouter.get('/user/projectsinvestedinbyuser', projectsInvestedInByUser);
fundingRouter.get('/user/checkfundingaccount', checkFundingAccount)