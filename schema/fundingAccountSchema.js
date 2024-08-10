import Joi from "joi";

export const fundingAccountSchema = Joi.object({
    amount: Joi.number()
})