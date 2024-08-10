import { Schema, model, Types } from "mongoose";

const fundingAccountSchema = new Schema ({
    fundAccountHoler: {type: Types.ObjectId, ref: "User"},
    amount: {type: Number},
    transactions: {type: Types.ObjectId, ref: "Transactions"}
})

export const FundingAccountModel = model("FundingAccount", fundingAccountSchema);