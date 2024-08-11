import { Router } from "express";
import { createProject, getAllProjects, getProjectById, getFullyFundedProjects, getNonFullyFundedProjects, updateProject, deleteProject } from "../controller/projectController.js";
import { remoteUpload } from "../middleware/upload.js";
import { isAuthenticated } from "../middleware/authn.js";
import { hasPermission } from "../middleware/authz.js";

export const projectRouter = Router();
projectRouter.post('/projects/createproject', isAuthenticated, hasPermission('createProject'), remoteUpload.single('image'), createProject);
projectRouter.get('/projects/getallprojects', getAllProjects);
projectRouter.get('/projects/getproject/:id', getProjectById);
// projectRouter.get('/projects/getprojectbyquery', getProjectByQuery);
projectRouter.get('/projects/getfullyfundedprojects', getFullyFundedProjects);
projectRouter.get('/projects/getprojectsnotfullyfunded', getNonFullyFundedProjects);
projectRouter.patch('/projects/updateproject/:id', isAuthenticated, hasPermission("updateProject"), updateProject);
projectRouter.delete('/projects/deleteproject/:id', isAuthenticated, hasPermission("deleteProject"), deleteProject);