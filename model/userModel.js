import { Schema, model } from "mongoose"

const userSchema = new Schema({

    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, unique: true, lowercase: true, required: true},
    password: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    gender: {type: String, enum: ['Male', 'Female', 'Other'], required: true},
    country: {type: String, required: true},
    role: {type: String, enum: ['Farmer', 'Investor'], default: 'Investor'},
    termsAndConditions: {type: Boolean, default: false}

}, {
    timestamps: true
})

export const UserModel = model('User', userSchema);