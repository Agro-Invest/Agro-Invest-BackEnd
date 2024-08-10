import {Schema, model, Types } from "mongoose";

const accountBalanceSchema = new Schema({

    accountHolder: {type: Types.ObjectId, ref: "User"},
    amount: {type: Number},
    currency: {type: String, enum: ['GhC', '$'], default: 'GhC'}

}, {
    timestamps: true
})

export const AccountBalanceModel = model('AccountBalance', accountBalanceSchema)