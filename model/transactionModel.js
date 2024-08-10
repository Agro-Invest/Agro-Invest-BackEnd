import {Schema, model, Types } from "mongoose";

const transactionSchema = new Schema({

    amount: {type: Number},
    currency: {type: String, enum:['GhC', '$'], default: 'GhC'},
    sender: {type: Types.ObjectId, ref: 'User'},
    receiver: {type: Types.ObjectId, ref: 'User'},
    status: {type: String, enum:['Pending', 'Succeeded', 'Failed'], default: "Pending"}

}, {
    timestamps: true
})

export const TransactionModel = model("Transaction", transactionSchema);