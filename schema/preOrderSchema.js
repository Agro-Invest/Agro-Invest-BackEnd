import Joi from "joi";

export const preOrderSchema = Joi.object({

    currency: Joi.valid("GhC", "$").default("GhC"),
    sellingPrice: Joi.number(),
    downpayment: Joi.number().required()

})