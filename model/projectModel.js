import { Schema, model, Types } from "mongoose"

const projectSchema = new Schema({

    projectTitle: {type: String},
    projectDescription: {type: String},
    projectStartDate: {type: Date},
    projectEndeDate: {type: Date},
    location: {type: String},
    projectStatus: {type: String, enum:['Selling', 'Sold Out'], default: 'Selling'},
    fundsNeeded: {type: Number},
    fundsAccumulated: {type: Types.ObjectId, ref: 'transaction'},
    fundingStatus: {type: String, enum:['Open', 'Closed']},
    minimumReturnOnInvestment: {type: Number},
    maximumReturnOnInvestment: {type: Number},
    createdBy: {type: Types.ObjectId, ref: 'Farmer'},
    fundedBy: {type: Types.ObjectId, refPath: 'modelType'},
    modelType: {type: String, enum: ['Farmer', 'Investor', 'Financial Institution']}
    // NB: Require

}, {
    timestamps: true
})

export const projectModel = model('Project', projectSchema);