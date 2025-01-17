import { loginValidatorSchema, userSchema } from "../schema/userSchema.js";
import { UserModel } from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { FarmerModel } from "../model/farmerModel.js";
import { InvestorModel } from "../model/investorModel.js";
import { AccountBalanceModel } from "../model/accountBalanceModel.js";
import { FundingAccountModel } from "../model/fundingAccountModel.js";

export const signup = async (req, res, next) => {
  try {
    const { error, value } = userSchema.validate(req.body);
    if (error) {
      const errormessage = error.details[0].message;
      if (errormessage.includes("fails to match the required pattern")) {
        return res
          .status(400)
          .send(
            "Password must include uppercase, lowercase and numbers\nPassword length must be between 8 - 12"
          );
      }
      return res.status(400).send(error.details[0].message);
    }
    const email = value.email;
    const findUser = await UserModel.findOne({ email });
    if (findUser) {
      return res.status(401).send("User already exist");
    }
    const hashPassword = await bcrypt.hash(value.password, 12);
    value.password = hashPassword;
    delete value.confirmPassword;

    // Save user in the database
    const newUser = await UserModel.create(value);
    // Create wallet/account for user
    const userAccountBalance = await AccountBalanceModel.create({ accountHolder: newUser.id})
    // Create funding account for user
    const userFundingAccount = await FundingAccountModel.create({ fundAccountHolder: newUser.id })
    // Populate farmer or investor collection
    if (value.role === "Farmer") {
      await FarmerModel.create({ farmerId: newUser.id, fundingAccount: userFundingAccount.id, accountBalance: userAccountBalance.id });
    } else if (value.role === "Investor") {
      await InvestorModel.create({ investorId: newUser.id, fundingAccount: userFundingAccount.id, accountBalance: userAccountBalance.id });
    }
    
    return res.status(201).send("Signed up successfully");
  } catch (error) {
    next(error);
  }
};

export const sessionLogin = async (req, res, next) => {
  try {
    const { error, value } = loginValidatorSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const email = value.email;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).send("User does not exist");
    }
    const correctPassword = await bcrypt.compare(value.password, user.password);
    if (!correctPassword) {
      return res.status(401).send("User does not exist");
    }
    // Generate a session
    req.session.user = { id: user.id };
    console.log(req.session.user);
    return res.status(200).send("Login successful");
  } catch (error) {
    next(error);
  }
};

export const tokenLogin = async (req, res, next) => {
  try {
    const { error, value } = loginValidatorSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const { email, password } = value;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).send("User not found");
    }
    const correctPassword = bcrypt.compare(password, user.password);
    if (!correctPassword) {
      return res.status(401).send("Invalid credentials");
    }
    // Create a token
    const token = jwt.sign(
        { id: user.id }, 
        process.env.JWT_SECRET_KEY, 
        { expiresIn: "72h" }
    );
    return res.status(200).json({
      message: "Loggin Successful",
      accesstoken: token,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    await req.session.destroy();
    return res.status(200).send("Logged out successfully");
  } catch (error) {
    next(error);
  }
};
