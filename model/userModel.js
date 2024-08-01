import { Schema, model } from "mongoose"

const userSchema = new Schema({

    firstName: {type: String},
    lastName: {type: String},
    otherName: {type: String},
    email: {type: String, unique: true, lowercase: true, required: true},
    password: {type: String, required: true},
    role: {type: String, enum: ['Farmer', 'Investor', 'Buyer', 'Financial Institution', 'Undecide'], default: 'Undecided'}

}, {
    timestamps: true
})

export const UserModel = model('User', userSchema);