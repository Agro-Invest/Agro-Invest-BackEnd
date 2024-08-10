import { Router } from "express";
import { getProjectsCreatedByFarmer, getFarmerFullyFundedProjects, getFarmerNonFullyFundedProjects } from "../controller/farmerController.js";

export const farmerRouter = Router();
farmerRouter.get('/user/projectcreatedbyfarmer', getProjectsCreatedByFarmer);
farmerRouter.get('/user/farmerfullyfundedprojects', getFarmerFullyFundedProjects);
farmerRouter.get('/user/farmernonfullyfundedprojects', getFarmerNonFullyFundedProjects);