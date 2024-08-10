import { Schema, model, Types } from "mongoose"

const projectSchema = new Schema({

    projectTitle: {type: String, required: true},
    projectDescription: {type: String, required: true},
    image: {type: String, required: true},
    projectStartDate: {type: Date, required: true},
    projectEndeDate: {type: Date, required: true},
    location: {type: String, required: true},
    projectStatus: {type: String, enum:['Selling', 'Sold Out'], default: 'Selling'},
    fundsNeeded: {type: Number, required: true},
    fundsAccumulated: {type: Number},
    fundingStatus: {type: String, enum:['Open', 'Closed']},
    minimumReturnOnInvestment: {type: String, required: true},
    maximumReturnOnInvestment: {type: String, required: true},
    createdBy: {type: Types.ObjectId, ref: 'Farmer'},
    fundedBy: [{type: Types.ObjectId, ref: 'User'}],
    // NB: Require

}, {
    timestamps: true
})

export const ProjectModel = model('Project', projectSchema);