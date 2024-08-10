import { Schema, model, Types } from "mongoose";

const fundSchema = new Schema({
    project: {type: Types.ObjectId, ref: "Project"},
    amount: {type: Number},
    currency: {type: String, enum: ["GhC", "$"], default: "GhC"},   
    contributors: [{type: Types.ObjectId, ref: "User"}]
})

export const FundModel = model("Fund", fundSchema);