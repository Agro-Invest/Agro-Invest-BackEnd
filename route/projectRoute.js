import { Router } from "express";
import { createProject, getAllProjects, getProjectById, getProjectByQuery, getFullyFundedProjects, getNonFullyFundedProjects, updateProject, deleteProject } from "../controller/projectController.js";

export const projectRouter = Router();
projectRouter.post('/user/createproject', createProject);
projectRouter.get('/user/getallprojects', getAllProjects);
projectRouter.get('/user/getproject/:id', getProjectById);
projectRouter.get('/user/getprojectbyquery', getProjectByQuery);
projectRouter.get('/user/getfullyfundedprojects', getFullyFundedProjects);
projectRouter.get('/user/getnonfullyfundedprojects', getNonFullyFundedProjects);
projectRouter.patch('/user/updateproject', updateProject);
projectRouter.delete('/user/deleteproject', deleteProject);