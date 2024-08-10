import { FarmerModel } from "../model/farmerModel.js";
import { ProjectModel } from "../model/projectModel.js";

// List Projects created by the farmer
export const getProjectsCreatedByFarmer = async (req, res, next) => {
  try {
    // check if user is a farmer
    const userId = req.session.user.id || req.user.id;
    const farmer = await FarmerModel.findById(userId);
    if (!farmer) {
      return res.status(403).send("User not authorised");
    }
    const farmerProjects = await ProjectModel.find({
      createdBy: farmer._id
    });
    if (!farmerProjects) {
      return res.status(401).send("Farmer has no project");
    }
    const farmerProjectsCount = await ProjectModel.find({
      createdAt: farmer._id,
    }).count();
    return res.status(200).json({
      farmerProjects: farmerProjects,
      farmerProjectsCount: farmerProjectsCount,
    });
  } catch (error) {
    next(error);
  }
}

// List projects that were created by farmer that are fully funded
export const getFarmerFullyFundedProjects = async (req, res, next) => {
  try {
    // check if user is a farmer
    const userId = req.session.user.id || req.user.id;
    const farmer = await FarmerModel.findById(userId);
    if (!farmer) {
      return res.status(403).send("User not authorised");
    }
    // Go through the projectModel and find projects where the (createdAt === farmerId) and (fundingStatus === "Closed")
    const fullyFundedProjects = await ProjectModel.find({
      createdBy: farmer._id,
      fundingStatus: "Closed",
    });
    if (!fullyFundedProjects) {
      return res.status(401).send("Funded projects is empty");
    }
    // const fullyFundedProjectsCount = fullyFundedProjects.length();
    const fullyFundedProjectsCount = await ProjectModel.find({
      createdAt: farmer._id,
      fundingStatus: "Closed",
    }).count();
    return res.status(200).json({
      fullyFundedProjects: fullyFundedProjects,
      fullyFundedProjectsCount: fullyFundedProjectsCount,
    });
  } catch (error) {
    next(error);
  }
};

// List project created by farmer receiving or waiting for funding
export const getFarmerNonFullyFundedProjects = async (req, res, next) => {
  try {
    // check if user is a farmer
    const userId = req.session.user.id || req.user.id;
    const farmer = await FarmerModel.findById(userId);
    if (!farmer) {
      return res.status(403).send("User not authorised");
    }
    // Go through the projectModel and find projects where the (createdAt === farmerId) and (fundingStatus === "Closed")
    const nonFullyFundedProjects = await ProjectModel.find({
      createdBy: farmer._id,
      fundingStatus: "Open",
    });
    if (!nonFullyFundedProjects) {
      return res.status(401).send("No project is waiting or receiving project");
    }
    // const fullyFundedProjectsCount = fullyFundedProjects.length();
    const nonFullyFundedProjectsCount = await ProjectModel.find({
      createdAt: farmer._id,
      fundingStatus: "Open",
    }).count();
    return res.status(200).json({
      nonFullyFundedProjects: nonFullyFundedProjects,
      nonFullyFundedProjectsCount: nonFullyFundedProjectsCount,
    });
  } catch (error) {
    next(error);
  }
};

