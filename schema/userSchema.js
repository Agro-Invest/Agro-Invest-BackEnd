import Joi from "joi";

export const userSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,12}$')).required(),
    confirmPassword: Joi.valid(Joi.ref('password')).required(),
    phoneNumber: Joi.string().required(),
    gender: Joi.string().valid('Male', 'Female', 'Other').required(),
    country: Joi.string().required(),
    role: Joi.string().valid('Farmer', 'Investor'),
    termsAndConditions: Joi.boolean().truthy('Accept').falsy('Reject')
})

export const loginValidatorSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,12}$')).required()
})