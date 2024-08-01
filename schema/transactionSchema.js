import Joi from "joi";

export const transactionSchema = Joi.object({

    amount: Joi.number(),
    currency: Joi.string().valid('GhC', '$').default('GhC'),
    status: Joi.string().valid('Pending', 'Succeeded', 'Failed').default('Pending')

})