import {Schema, model, Types } from "mongoose";

const accountBalanceSchema = new Schema({

    accountHolder: {type: Types.ObjectId, ref: "User"},
    currency: {type: String, enum: ['GhC', '$'], default: 'GhC'},
    amount: {type: Number, default: 0}
    
}, {
    timestamps: true
})

export const AccountBalanceModel = model('AccountBalance', accountBalanceSchema)