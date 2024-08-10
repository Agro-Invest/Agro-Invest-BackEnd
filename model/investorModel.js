import { Schema, model, Types } from 'mongoose';


const investorSchema = new Schema({

    investorId: {type: Types.ObjectId, ref: "User"},
    fundingAccount: {type: Types.ObjectId, ref: "Fund"},
    fundedProjects: [{type: Types.ObjectId, ref: "Project"}],
    accountBalance: {type: Types.ObjectId, ref: "AccountBalance"}

}, {
    timestamps: true
})

export const InvestorModel = model('Investor', investorSchema);