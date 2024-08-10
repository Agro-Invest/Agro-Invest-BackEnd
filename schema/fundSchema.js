import Joi from "joi";

export const fundSchema = Joi.object({
    amount: Joi.number().required(),
    currency: Joi.string().valid("GhC", "$").optional()
})