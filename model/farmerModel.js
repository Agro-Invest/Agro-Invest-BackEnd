import { Schema, model, Types } from "mongoose";

const farmerSchema = new Schema({

    farmerId: {type: Types.ObjectId, ref: "User"},
    createdProjects: [{type: Types.ObjectId, ref: "Project"}],
    fundingAccount: {type: Types.ObjectId, ref: "Fund"},
    fundedProjects: [{type: Types.ObjectId, ref: "Project"}],
    accountBalance: {type: Types.ObjectId, ref: 'AccountBalance'}

}, {
    timestamps: true
})

export const FarmerModel = model('Farmer', farmerSchema);