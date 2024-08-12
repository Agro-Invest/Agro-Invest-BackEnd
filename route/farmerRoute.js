import { Router } from "express";
import { getProjectsCreatedByFarmer, getFarmerFullyFundedProjects, getFarmerNonFullyFundedProjects } from "../controller/farmerController.js";
import { isAuthenticated } from "../middleware/authn.js";
import { hasPermission } from "../middleware/authz.js";

export const farmerRouter = Router();
farmerRouter.get('/farmer/farmerprojects', isAuthenticated, hasPermission("getProjectsCreatedByFarmer"), getProjectsCreatedByFarmer);
farmerRouter.get('/farmer/farmerprojects/fullyfunded', isAuthenticated, hasPermission("getProjectsCreatedByFarmerThatAreFullyFunded"), getFarmerFullyFundedProjects);
farmerRouter.get('/farmer/farmerprojects/notfullyfunded', isAuthenticated, hasPermission("getProjectsCreatedByFarmerThatAreNotFullyFunded"), getFarmerNonFullyFundedProjects);