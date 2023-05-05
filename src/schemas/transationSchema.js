import Joi from "joi";      

export const transactionsSchema = Joi.object({
    description: Joi.string().min(2).required(),
    value: Joi.number().min(1).required(),
    type: Joi.string().valid("entrada", "saida").required(),
    user: Joi.object().required(),
    createAt: Joi.string().required(),    
});                 