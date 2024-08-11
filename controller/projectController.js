import { ProjectModel } from "../model/projectModel.js";
import { FarmerModel } from "../model/farmerModel.js";
import { projectSchema, updateProjectSchema } from "../schema/projectSchema.js";

// Create Project
export const createProject = async (req, res, next) => {
  try {
    const projectData = {
      ...req.body,
      image: req.file.filename
    }
    const { error, value } = projectSchema.validate(projectData);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    const userId = req.session?.user?.id || req?.user?.id;
    const farmer = await FarmerModel.findOne({ farmerId: userId });
    if (!farmer) {
        return res.status(401).send("Authorisation denied");
    }
    // Create Project
    const project = await ProjectModel.create({...value, image: req.file.filename, createdBy: farmer._id});
    farmer.createdProjects.push(project._id);
    await farmer.save();
    return res.status(201).json({
      message: "Project created successfully",
      project: project
    }) 
  } catch (error) {
    next(error);
  }
};

// Get All Projects
export const getAllProjects = async (req, res, next) => {
  try {
    const projects = await ProjectModel.find();
    return res.status(200).json({
      projects: projects
    })
  } catch (error) {
    next(error)
  }
}

// Get Project by Id
export const getProjectById = async(req, res, next) => {
  try {
    const project = await ProjectModel.findById(req.params.id);
    return res.status(200).json({
      project: project
    })
  } catch (error) {
    next(error);
  }
}

// Get project by querry
// export const getProjectByQuery = async(req, res, next) => {
//   try {
//     const { filter, limit, skip } = req.query;
//     const projects = await ProjectModel
//       .find(JSON.parse(filter))
//       .limit(JSON.parse(limit))
//       .skip(JSON.parse(skip))
//     return res.status(200).json({
//       projects: projects
//     })
//   } catch (error) {
//     next(error);
//   }
// }

// Get all fully funded projects
export const getFullyFundedProjects = async(req, res, next) => {
  try {
    const fundedProjects = await ProjectModel.find({
      fundingStatus: "Closed"
    })
    if (!fundedProjects) {
      return res.status(404).send("No fully funded projects");
    }
    return res.status(200).json({
      fundedProjects: fundedProjects
    })
  } catch (error) {
    next(error);
  }
}

// Get all projects requiring funding
export const getNonFullyFundedProjects = async(req, res, next) => {
  try {
    const nonFullyFundedProjects = await ProjectModel.find({
      fundingStatus: "Open"
    })
    if (!nonFullyFundedProjects) {
      return res.status(404).send("No project receiving or awaiting funding");
    }
    return res.status(200).json({
      nonFullyFundedProjects: nonFullyFundedProjects
    })
  } catch (error) {
    next(error);
  }
}

// Update Project
export const updateProject = async(req, res, next) => {
  try {
    const projectData = {
      ...req.body,
      image: req.file?.filename
    }
    const { error, value } = updateProjectSchema.validate(projectData);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const userId = req.session?.user?.id || req?.user?.id;

    const farmer = await FarmerModel.findOne({ farmerId: userId});
    if (!farmer) {
      return res.status(403).send('User not authorised');
    }
    const updatedProject = await ProjectModel.findByIdAndUpdate(req.params.id, value, {new: true})
    return res.status(200).json({
      message: "Project Updated Successfully",
      project: updatedProject
    })
  } catch (error) {
    next(error);
  }
}

// Delete Project
export const deleteProject = async(req, res, next) => {
  try {
    const userId = req.session?.user?.id || req?.user?.id;
    if (!userId) {
      return res.status(403).send("User not authorised");
    }
    await ProjectModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      message: "Project deleted"
    })
  } catch (error) {
    next(error);
  }
}