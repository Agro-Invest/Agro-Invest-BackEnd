import { Schema, model, Types} from "mongoose"

const buyerSchema = new Schema({

    lobbiedProjects: [{type: Types.ObjectId, ref: 'Project'}],
    lobbiedAmount: {type: Types.ObjectId, ref: 'AccountBalance'}

}, {
    timestamps: true
})

export const BuyerModel = model('Buyer', buyerSchema);