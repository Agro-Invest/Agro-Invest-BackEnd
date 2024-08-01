import { Schema, model, Types } from "mongoose";

const farmerSchema = new Schema({

    projects: [{types: Types.ObjectId, ref: 'Project'}],
    accountBalance: {type: Types.ObjectId, ref: 'AccountBalance'}

}, {
    timestamps: true
})

export const FarmerModel = model('Farmer', farmerSchema);