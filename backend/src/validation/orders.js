import Joi from 'joi';

export const addOrderSchema = Joi.object({
  userId: Joi.string().required().messages({
    'string.base': 'ID користувача повинен бути текстом.',
    'string.empty': 'ID користувача не може бути порожнім.',
    'any.required': 'ID користувача є обов’язковим полем.',
  }),
  tourId: Joi.string().required().messages({
    'string.base': 'ID туру повинен бути текстом.',
    'string.empty': 'ID туру не може бути порожнім.',
    'any.required': 'ID туру є обов’язковим полем.',
  }),
  description: Joi.string().required().messages({
    'string.base': 'Опис туру повинен бути текстом.',
    'string.empty': 'Опис туру не може бути порожнім.',
    'any.required': 'Опис туру є обов’язковим полем.',
  }),
  totalPrice: Joi.number().integer().min(0).required().messages({
    'number.base': 'Ціна повинна бути числом.',
    'number.integer': 'Ціна повинна бути цілим числом.',
    'number.min': 'Ціна не може бути меншою за 0.',
    'any.required': 'Ціна є обов’язковим полем.',
  }),
  shippingAddress: Joi.string().min(3).max(100).required().messages({
    'string.base': 'Адреса повинна бути текстом.',
    'string.empty': 'Адреса не може бути порожньою.',
    'string.min': 'Адреса повинна містити щонайменше 3 символи.',
    'string.max': 'Адреса не може перевищувати 100 символів.',
    'any.required': 'Адреса є обов’язковим полем.',
  }),
});
