import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const fundSchema = new Schema({
    project: {type: Types.ObjectId, ref: "Project"},
    amount: {type: Number, required: true},
    currency: {type: String, enum: ["GhC", "$"], default: "GhC"},   
    contributors: [{type: Types.ObjectId, ref: "User"}]
})

fundSchema.plugin(toJSON);
export const FundModel = model("Fund", fundSchema);