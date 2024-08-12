import Joi from "joi";

export const projectSchema = Joi.object({

    projectTitle: Joi.string().required(),
    projectDescription: Joi.string().required(),
    image: Joi.string().required(),
    projectGallery: Joi.string().optional(), // check the right way to use for arrays
    projectStartDate: Joi.date().required(),
    projectEndDate: Joi.date().required(),
    location: Joi.string().required(),
    projectStatus: Joi.string().valid('Selling', 'Sold Out').default('Selling'),
    fundsNeeded: Joi.number().required(),
    fundingStatus: Joi.string().valid('Open', 'Closed').default('Open'),
    minimumReturnOnInvestment: Joi.string().required(),
    maximumReturnOnInvestment: Joi.string().required(),
    sellingPrice: Joi.number().optional()

})

export const updateProjectSchema = Joi.object({

    projectTitle: Joi.string().optional(),
    projectDescription: Joi.string().optional(),
    image: Joi.string().optional(),
    projectGallery: Joi.string().optional(), // check the right way to use for arrays
    projectStartDate: Joi.date().optional(),
    projectEndDate: Joi.date().optional(),
    location: Joi.string().optional(),
    projectStatus: Joi.string().valid('Selling', 'Sold Out').optional(),
    fundsNeeded: Joi.number().optional(),
    fundingStatus: Joi.string().valid('Open', 'Closed').optional(),
    minimumReturnOnInvestment: Joi.string().optional(),
    maximumReturnOnInvestment: Joi.string().optional(),
    sellingPrice: Joi.number().optional()

})

