import { Router } from "express";
import { getProjectsCreatedByFarmer, getFarmerFullyFundedProjects, getFarmerNonFullyFundedProjects } from "../controller/farmerController.js";
import { isAuthenticated } from "../middleware/authn.js";
import { hasPermission } from "../middleware/authz.js";

export const farmerRouter = Router();
farmerRouter.get('/user/projectcreatedbyfarmer', isAuthenticated, hasPermission("getProjectsCreatedByFarmer"), getProjectsCreatedByFarmer);
farmerRouter.get('/user/farmerfullyfundedprojects', isAuthenticated, hasPermission("getProjectsCreatedByFarmerThatAreFullyFunded"), getFarmerFullyFundedProjects);
farmerRouter.get('/user/farmernonfullyfundedprojects', isAuthenticated, hasPermission("getProjectsCreatedByFarmerThatAreNotFullyFunded"), getFarmerNonFullyFundedProjects);