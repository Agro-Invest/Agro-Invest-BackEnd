import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const fundingAccountSchema = new Schema ({
    fundAccountHolder: {type: Types.ObjectId, ref: "User"},
    currency: {type: String, enum: ['GhC', '$'], default: 'GhC'},
    amount: {type: Number, default: 0},
    transactions: {type: Types.ObjectId, ref: "Transactions"}
})

fundingAccountSchema.plugin(toJSON);
export const FundingAccountModel = model("FundingAccount", fundingAccountSchema);