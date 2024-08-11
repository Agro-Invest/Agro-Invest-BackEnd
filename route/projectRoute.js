import { Router } from "express";
import { createProject, getAllProjects, getProjectById, getProjectByQuery, getFullyFundedProjects, getNonFullyFundedProjects, updateProject, deleteProject } from "../controller/projectController.js";
import { remoteUpload } from "../middleware/upload.js";
import { isAuthenticated } from "../middleware/authn.js";
import { hasPermission } from "../middleware/authz.js";

export const projectRouter = Router();
projectRouter.post('/user/createproject', isAuthenticated, hasPermission('createProject'), remoteUpload.single('image'), createProject);
projectRouter.get('/user/getallprojects', getAllProjects);
projectRouter.get('/user/getproject/:id', getProjectById);
projectRouter.get('/user/getprojectbyquery', getProjectByQuery);
projectRouter.get('/user/getfullyfundedprojects', getFullyFundedProjects);
projectRouter.get('/user/getnonfullyfundedprojects', getNonFullyFundedProjects);
projectRouter.patch('/user/updateproject/:id', isAuthenticated, hasPermission("updateProject"), updateProject);
projectRouter.delete('/user/deleteproject/:id', isAuthenticated, hasPermission("deleteProject"), deleteProject);