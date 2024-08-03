import Joi from "joi";

export const projectSchema = Joi.object({

    projectTitle: Joi.string(),
    projectDescription: Joi.string(),
    projectStartDate: Joi.date(),
    projectEndDate: Joi.date(),
    location: Joi.string(),
    projectStatus: Joi.string().valid('Selling', 'Sold Out').default('Selling'),
    fundsNeeded: Joi.number(),
    fundingStatus: Joi.string().valid('Open', 'Closed').default('Open'),
    minimumReturnOnInvestment: Joi.number(),
    maximumReturnOnInvestment: Joi.number()

})