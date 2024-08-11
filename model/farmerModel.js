import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const farmerSchema = new Schema({

    farmerId: {type: Types.ObjectId, ref: "User"},
    createdProjects: [{type: Types.ObjectId, ref: "Project"}],
    fundingAccount: {type: Types.ObjectId, ref: "Fund"},
    fundedProjects: [{type: Types.ObjectId, ref: "Project"}],
    accountBalance: {type: Types.ObjectId, ref: 'AccountBalance'}

}, {
    timestamps: true
})

farmerSchema.plugin(toJSON);
export const FarmerModel = model('Farmer', farmerSchema);