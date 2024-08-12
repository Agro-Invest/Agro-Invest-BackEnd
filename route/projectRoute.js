import { Router } from "express";
import { createProject, getAllProjects, getProjectById, searchProjects, getFullyFundedProjects, getNonFullyFundedProjects, updateProject, deleteProject } from "../controller/projectController.js";
import { remoteUpload } from "../middleware/upload.js";
import { isAuthenticated } from "../middleware/authn.js";
import { hasPermission } from "../middleware/authz.js";

export const projectRouter = Router();
projectRouter.post('/farmingprojects/createproject', isAuthenticated, hasPermission('createProject'), remoteUpload.single('image'), createProject);
projectRouter.get('/farmingprojects/getallprojects', getAllProjects);
projectRouter.get('/farmingprojects/getproject/:id', getProjectById);
projectRouter.get('/farmingprojects/searchproject', searchProjects);
// projectRouter.get('/projects/getprojectbyquery', getProjectByQuery);
projectRouter.get('/farmingprojects/getfullyfundedprojects', getFullyFundedProjects);
projectRouter.get('/farmingprojects/getnotfullyfundedprojects', getNonFullyFundedProjects);
projectRouter.patch('/farmingprojects/updateproject/:id', isAuthenticated, hasPermission("updateProject"), updateProject);
projectRouter.delete('/farmingprojects/deleteproject/:id', isAuthenticated, hasPermission("deleteProject"), deleteProject);