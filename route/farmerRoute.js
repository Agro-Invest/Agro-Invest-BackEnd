import { Router } from "express";
import { getProjectsCreatedByFarmer, getFarmerFullyFundedProjects, getFarmerNonFullyFundedProjects } from "../controller/farmerController.js";
import { isAuthenticated } from "../middleware/authn.js";
import { hasPermission } from "../middleware/authz.js";

export const farmerRouter = Router();
farmerRouter.get('/farmer/farmersprojects', isAuthenticated, hasPermission("getProjectsCreatedByFarmer"), getProjectsCreatedByFarmer);
farmerRouter.get('/farmer/farmersprojects/fullyfunded', isAuthenticated, hasPermission("getProjectsCreatedByFarmerThatAreFullyFunded"), getFarmerFullyFundedProjects);
farmerRouter.get('/farmer/farmersprojects/notfullyfunded', isAuthenticated, hasPermission("getProjectsCreatedByFarmerThatAreNotFullyFunded"), getFarmerNonFullyFundedProjects);