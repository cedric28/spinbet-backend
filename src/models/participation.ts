import Joi from "joi";

interface Participation {
    firstName: string;
    lastName: string;
    percentage: number;
    userId: number;
}

const validateParticipation = (data: Participation) => {
    const schema = Joi.object({
        firstName: Joi.string().min(2).max(50).required(),
        lastName: Joi.string().min(2).max(50).required(),
        percentage: Joi.number().integer().min(0).max(100).required(),
        userId: Joi.number().integer().positive().required()
    });

    return schema.validate(data);
};

export { validateParticipation, Participation };
