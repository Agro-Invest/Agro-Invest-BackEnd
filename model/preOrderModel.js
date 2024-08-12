import {Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const preOrderSchema = new Schema({

    buyerId: {type: Types.ObjectId, ref: "User"},
    projectId: {type: Types.ObjectId, ref: "Project"},
    currency: {type: String, enum: ['GhC', '$'], default: 'GhC'},
    sellingPrice: {type: Number, default: 0},
    downpayment: {type: Number, required: true}
    
}, {
    timestamps: true
})

preOrderSchema.plugin(toJSON);
export const PreOrderModel = model('PreOrder', preOrderSchema)