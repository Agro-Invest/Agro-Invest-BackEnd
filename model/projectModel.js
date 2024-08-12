import { Schema, model, Types } from "mongoose"
import { toJSON } from "@reis/mongoose-to-json";

const projectSchema = new Schema({

    projectTitle: {type: String, required: true},
    projectDescription: {type: String, required: true},
    image: {type: String, required: true},
    projectGallery: [{type: String}],
    projectStartDate: {type: Date, required: true},
    projectEndDate: {type: Date, required: true},
    location: {type: String, required: true},
    projectStatus: {type: String, enum:['Selling', 'Sold Out'], default: 'Selling'},
    fundsNeeded: {type: Number, required: true},
    fundsAccumulated: {type: Number, default: 0},
    fundingStatus: {type: String, enum:['Open', 'Closed']},
    minimumReturnOnInvestment: {type: String, required: true},
    maximumReturnOnInvestment: {type: String, required: true},
    sellingPrice: {type: Number, default: 0},
    createdBy: {type: Types.ObjectId, ref: 'Farmer'},
    fundedBy: [{type: Types.ObjectId, ref: 'User'}],
    // NB: Require

}, {
    timestamps: true
})

projectSchema.plugin(toJSON);
export const ProjectModel = model('Project', projectSchema);