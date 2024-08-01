import Joi from "joi";

export const undecidedSchema = Joi.object({

    role: Joi.string().valid('Farmer',  'Investor', 'Buyer', 'Financial Institution', 'Undecide').default('Undecided').optional()

})