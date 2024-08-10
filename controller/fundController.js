import { UserModel } from "../model/userModel.js";
import { FarmerModel } from "../model/farmerModel.js";
import { InvestorModel } from "../model/investorModel.js";
import { FundModel } from "../model/fundModel.js";
import { AccountBalanceModel } from "../model/accountBalanceModel.js";
import { fundSchema } from "../schema/fundSchema.js";
import { TransactionModel } from "../model/transactionModel.js";
import { ProjectModel } from "../model/projectModel.js";
import { FundingAccountModel } from "../model/fundingAccountModel.js";

// Fund project
export const fundProject = async (req, res, next) => {
  try {
    const { error, value } = fundSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[1].message);
    }
    const userId = req.session.user.id || req.user.id;
    // check for existing user
    const user = await UserModel.findOne({ userId });
    if (!user) {
      return res.status(401).send("User does not exist");
    }
    // Check user account balance
    const userAccount = await AccountBalanceModel.findOne({ userId });
    if (userAccount.amount < value.amount) {
      return res.status(400).send("Insufficient Balance");
    }
    // Checking funding status on project
    const project = await ProjectModel.findById(req.params.id);
    if (!project) {
      return res.status(400).send("Cannot locate project");
    }
    const fundsNeeded = project.fundsNeeded;
    const fundsAccumulated = project.fundsAccumulated;
    const fundsRequiredToMeetTarget = fundsNeeded - fundsAccumulated;
    // Compare the amount the user wants to invest to the amount remaining to meet target
    if (fundsRequiredToMeetTarget < value.amount) {
      return res.status(400).send("Cannot fund more than required amount");
    }
    // Log transaction
    const transaction = await TransactionModel.create({
      sender: userId,
      receiver: req.params.id,
      amount: value.amount,
    });
    if (!transaction) {
      return res.status(400).send("Transaction failed");
    }
    // Update farmers collection if the user is a farmer
    if (user.role === "Farmer") {
      const farmer = await FarmerModel.findOne({ farmerId: userId });
      const fundingAccount = farmer.fundingAccount;
      const accountBalance = farmer.accountBalance;
      // Update funding account
      farmer.fundingAccount = fundingAccount + req.body.amount;
      // Update funded projects
      farmer.fundedProjects.push(req.params.id);
      // Update farmer's account balance
      farmer.accountBalance = accountBalance - req.body.amount;
      // Save farmer data
      await farmer.save();
    }
    // Update investors collection if the user is an investor
    else if (user.role === "Investor") {
      const investor = await InvestorModel.findOne({ investorId: userId });
      const fundingAccount = investor.fundingAccount;
      const accountBalance = investor.accountBalance;
      // Update funding account
      investor.fundingAccount = fundingAccount + req.body.amount;
      // Update funded projects
      investor.fundedProjects.push(req.params.id);
      // Update investor's account balance
      investor.accountBalance = accountBalance - req.body.amount;
      // Save investor data
      await investor.save();
    }
    // Check if a project with the same id exist in the funds collection
    const fundingProject = await FundModel.findById(req.params.id);
    // If project already exist, update that particular document
    if (fundingProject) {
      const fundingBalance = fundingProject.amount;
      fundingProject.amount = fundingBalance + value.amount;
      contributors.push(userId);
      await FundModel.save();
      return res.status(201).json({
        message: "Funds added successfully",
        fundingProject: fundingProject,
      });
    }
    // Create a new funding document
    const newFundingProject = await FundModel.create({
      amount: value.amount,
      contributor: userId,
      project: req.params.id,
    });
    if (newFundingProject) {
      return res.status(201).json({
        message: "Started funding",
        newFundingProject: newFundingProject,
      });
    }
  } catch (error) {
    next(error);
  }
};

// Projects invested in by a user
export const projectsInvestedInByUser = async (req, res, nex) => {
  const userId = req.session.user.id || req.user.id;
  const user = await UserModel.findById(userId);
  if (!user) {
    return res.status(400).json("User not found");
  }
  const projectInvestedIn = await ProjectModel.find({
    fundedBy: { $in: [userId] },
  });
  if (!projectInvestedIn) {
    return res.status(400).json("Have not invested in any project yet");
  }
  return res.status(200).json({projectInvestedIn});
};

// Check your funding account
export const checkFundingAccount = async (req, res, next) => {
  try {
    const userId = req.session.user.id || req.user.id;
    const userFundingAccount = await FundingAccountModel.findOe({
      fundAccountHolder: userId,
    });
    if (!userFundingAccount) {
      return res.status(400).json("Unable to locate user funding account");
    }
    const userFunds = userFundingAccount.amount;
    if (!userFunds) {
      return res.status(400).json("Unable to fetch user funds");
    }
    return res.status(200).json({
      userFunds: userFunds,
    });
  } catch (error) {
    next(error);
  }
};