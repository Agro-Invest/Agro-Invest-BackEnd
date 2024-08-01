import { Schema, model, Types } from 'mongoose';

const financialInstitutionSchema = new Schema({

    fundingAccount: {type: Types.ObjectId, ref: 'AccountBalance'},
    projectUnderReview: [{type: Types.ObjectId, ref: 'Project'}],
    fundedProjects: [{type: Types.ObjectId, ref: 'Project'}]

}, {
    timestamps: true
})

export const FinancialInstitutionModel = model('FinancialInstitution', financialInstitutionSchema);