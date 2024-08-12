import { UserModel } from "../model/userModel.js";
import { PreOrderModel } from "../model/preOrderModel.js";
import { AccountBalanceModel } from "../model/accountBalanceModel.js";
import { ProjectModel } from "../model/projectModel.js";
import { TransactionModel } from "../model/transactionModel.js";
import { preOrderSchema } from "../schema/preOrderSchema.js";

// preorder project
export const preOrderProject = async (req, res, next) => {
  try {
    const { error, value } = preOrderSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const userId = req.session?.user?.id || req?.user?.id;
    // Find user
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(401).json("User not found");
    }
    // Check project already exist in preorder collection
    const preOrderedProject = await PreOrderModel.findOne({ projectId: req.params.id });
    if (preOrderedProject) {
        return res.status(400).json("Sorry, project has already been pre-ordered");
    }
    // Get project selling price
    const project = await ProjectModel.findById(req.params.id);
    if (!project) {
      return res.status(400).send("Cannot locate project");
    }
    const projectSellingPrice = project.sellingPrice;
    const minimumDownpayment = projectSellingPrice * 0.7 // 70% of Selling price
    // find user accountbalance
    const userAccount = await AccountBalanceModel.findOne({
      accountHolder: userId,
    });
    let userAccountBalance = userAccount.amount;
    // compare downpayment, useraccount and minimumDownpayment
    if (value.downpayment > userAccountBalance) {
      return res.status(400).send("Insufficient Balance");
    } else if (value.downpayment < minimumDownpayment) {
      return res.status(400).json(`Your amount of ${userAccount.currency}${value.downpayment} is less than ${userAccount.currency}${minimumDownpayment} minimum downpayment`);
    }
    // Log transaction
    const transaction = await TransactionModel.create({
        sender: userId,
        receiver: req.params.id,
        amount: value.downpayment,
      });
      if (!transaction) {
        return res.status(400).send("Transaction failed");
      }
      //  Update User account balance
      userAccountBalance = userAccountBalance - value.downpayment;
      userAccount.amount = userAccountBalance;
      await userAccount.save()

    // create preorder document
    const preOrder = await PreOrderModel.create({
        buyerId: userId,
        projectId: req.params.id,
        sellingPrice: projectSellingPrice,
        downpayment: value.downpayment
    });
    if (!preOrder) {
        return res.status(400).json("Pre-order failed");
    }
    // Update project status to "Sold out"
    project.projectStatus = "Sold Out"
    await project.save();
    return res.status(200).json({
        message: "Pre-ordered successfully",
        preOrder: preOrder
    })
  } catch (error) {
    next(error);
  }
};

// Get your preordered projects
export const getPreOrdedProjects = async(req, res, next) => {
    try {
        const userId = req.session?.user?.id || req?.user?.id;
    // Find user
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(401).json("User not found");
    }
    const preOrderedProjects = await PreOrderModel.find({ buyerId: userId });
    if (!preOrderedProjects) {
        return res.status(400).json("No pre-ordered project");
    }
    res.status(200).json({
        preOrderedProjects: preOrderedProjects
    })
    } catch (error) {
        next(error);
    }
}