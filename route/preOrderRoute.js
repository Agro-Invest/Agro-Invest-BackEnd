import { Router } from "express";
import { preOrderProject, getPreOrdedProjects } from "../controller/preOrderController.js";
import { isAuthenticated } from "../middleware/authn.js";
import { hasPermission } from "../middleware/authz.js";

export const preOrderRouter = Router();
preOrderRouter.post('/preorder/preorderproject/:id', isAuthenticated, hasPermission('pre-order'), preOrderProject);
preOrderRouter.get('/preorder/userpreorderedprojects', isAuthenticated, hasPermission('getPreOrderProjects'),getPreOrdedProjects);

