import { UserModel } from "../model/userModel.js";
import { AccountBalanceModel } from "../model/accountBalanceModel.js";

// Get Account balance
export const checkAccountBalance = async (req, res, next) => {
    try {
        const userId = req.session.user.id || req.user.id;
        const userAccount = await AccountBalanceModel.findById(userId);
        if (!userAccount) {
            return res.status(400).json("User has no account");
        }
        const accountBalance = userAccount.amount;
        res.status(200).json({accountBalance});
    } catch (error) {
        next(error)
    }
}

// TopUp Account - (Will need payment gateway for that)

// Withdraw from account - (Will need payment gateway for that)