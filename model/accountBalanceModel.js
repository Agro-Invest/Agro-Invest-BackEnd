import {Schema, model } from "mongoose";

const accountBalanceSchema = new Schema({

    amount: {type: Number},
    currency: {type: String, enum: ['GhC', '$'], default: 'GhC'}

}, {
    timestamps: true
})

export const AccountBalanceModel = model('AccountBalance', accountBalanceSchema)