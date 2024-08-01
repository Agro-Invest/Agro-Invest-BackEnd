import Joi from "joi";

export const accountBalanceSchema = Joi.object({

    amount: Joi.number(),
    currency: Joi.string().valid('GhC', '$').default('GhC')

})