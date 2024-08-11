import {Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const accountBalanceSchema = new Schema({

    accountHolder: {type: Types.ObjectId, ref: "User"},
    currency: {type: String, enum: ['GhC', '$'], default: 'GhC'},
    amount: {type: Number, default: 0}
    
}, {
    timestamps: true
})

accountBalanceSchema.plugin(toJSON);
export const AccountBalanceModel = model('AccountBalance', accountBalanceSchema)