import Joi from "joi";

interface AuthUser {
    name?: string;
    email: string;
    password: string;
}

const validateAuthUser = (user: AuthUser) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(50).required()
    });

    return schema.validate(user);
};

const validateRegisterUser = (user: AuthUser) => {
    const schema = Joi.object({
        name: Joi.string().min(2).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(50).required()
    });

    return schema.validate(user);
};

export { validateAuthUser, validateRegisterUser,AuthUser };
