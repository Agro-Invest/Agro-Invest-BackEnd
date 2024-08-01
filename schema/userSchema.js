import Joi from "joi";

export const userSchema = Joi.object({
    
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    otherName: Joi.string().optional(),
    email: Joi.string().email().required(),
    password: Joi.string.pattern(new RegExp('^[a-zA-Z0-9]{6, 8}$')),
    confirmPassword: Joi.ref('password'),
    role: Joi.string().valid('Farmer',  'Investor', 'Buyer', 'Financial Institution', 'Undecide').default('Undecided').optional()

})