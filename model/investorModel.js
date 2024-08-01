import { Schema, model } from 'mongoose';


const investorSchema = new Schema({

    fundingAccount: {type: Types.ObjectId, ref:'AccountBalance'},
    fundedProjects: [{type: Types.ObjectsId, ref: 'Project'}]

}, {
    timestamps: true
})

export const InvestorModel = model('Investor', investorSchema);