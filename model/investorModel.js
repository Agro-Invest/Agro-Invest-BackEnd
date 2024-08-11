import { Schema, model, Types } from 'mongoose';
import { toJSON } from '@reis/mongoose-to-json';


const investorSchema = new Schema({

    investorId: {type: Types.ObjectId, ref: "User"},
    fundingAccount: {type: Types.ObjectId, ref: "Fund"},
    fundedProjects: [{type: Types.ObjectId, ref: "Project"}],
    accountBalance: {type: Types.ObjectId, ref: "AccountBalance"}

}, {
    timestamps: true
})

investorSchema.plugin(toJSON);
export const InvestorModel = model('Investor', investorSchema);