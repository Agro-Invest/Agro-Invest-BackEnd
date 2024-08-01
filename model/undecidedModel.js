import { Schema, model } from 'mongoose';

const undecidedSchema = new Schema({

    role: {type: String, enum: ['Farmer', 'Investor', 'Buyer', 'Financial Institution', 'Undecided'], default: 'Undecided'}

}, {
    timestamps: true
})

export const UndecidedModel = model('Undecided', undecidedSchema);