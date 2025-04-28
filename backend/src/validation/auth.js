import Joi from 'joi';

export const registerUserSchema = Joi.object({
  name: Joi.string().min(2).max(50).required().messages({
    'string.base': 'Ім’я повинно бути текстом.',
    'string.empty': 'Ім’я не може бути порожнім.',
    'string.min': 'Ім’я повинно містити щонайменше 2 символи.',
    'string.max': 'Ім’я не може перевищувати 50 символів.',
    'any.required': 'Ім’я є обов’язковим полем.',
  }),
  email: Joi.string().email().required().messages({
    'string.base': 'Email повинен бути текстом.',
    'string.email': 'Email повинен бути валідним.',
    'string.empty': 'Email не може бути порожнім.',
    'any.required': 'Email є обов’язковим полем.',
  }),
  password: Joi.string().min(6).required().messages({
    'string.base': 'Пароль повинен бути текстом.',
    'string.empty': 'Пароль не може бути порожнім.',
    'string.min': 'Пароль повинен містити щонайменше 6 символів.',
    'any.required': 'Пароль є обов’язковим полем.',
  }),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.base': 'Email повинен бути текстом.',
    'string.email': 'Email повинен бути валідним.',
    'string.empty': 'Email не може бути порожнім.',
    'any.required': 'Email є обов’язковим полем.',
  }),
  password: Joi.string().required().messages({
    'string.base': 'Пароль повинен бути текстом.',
    'string.empty': 'Пароль не може бути порожнім.',
    'any.required': 'Пароль є обов’язковим полем.',
  }),
});

export const requestResetEmailSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.base': 'Email повинен бути текстом.',
    'string.email': 'Email повинен бути валідним.',
    'string.empty': 'Email не може бути порожнім.',
    'any.required': 'Email є обов’язковим полем.',
  }),
});

export const resetPasswordSchema = Joi.object({
  password: Joi.string().min(6).required().messages({
    'string.base': 'Пароль повинен бути текстом.',
    'string.empty': 'Пароль не може бути порожнім.',
    'string.min': 'Пароль повинен містити щонайменше 6 символів.',
    'any.required': 'Пароль є обов’язковим полем.',
  }),
  token: Joi.string().required().messages({
    'string.base': 'Токен повинен бути текстом.',
    'string.empty': 'Токен не може бути порожнім.',
    'any.required': 'Токен є обов’язковим полем.',
  }),
});
