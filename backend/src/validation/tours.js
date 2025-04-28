import Joi from 'joi';

export const addTourSchema = Joi.object({
  title: Joi.string().min(3).max(100).required().messages({
    'string.base': 'Назва туру повинна бути текстом.',
    'string.empty': 'Назва туру не може бути порожньою.',
    'string.min': 'Назва туру повинна містити щонайменше 3 символи.',
    'string.max': 'Назва туру не може перевищувати 100 символів.',
    'any.required': 'Назва туру є обов’язковим полем.',
  }),
  description: Joi.string().required().messages({
    'string.base': 'Опис туру повинен бути текстом.',
    'string.empty': 'Опис туру не може бути порожнім.',
    'any.required': 'Опис туру є обов’язковим полем.',
  }),
  minimumAge: Joi.number().integer().min(0).required().messages({
    'number.base': 'Мінімальний вік повинен бути числом.',
    'number.integer': 'Мінімальний вік повинен бути цілим числом.',
    'number.min': 'Мінімальний вік не може бути меншим за 0.',
    'any.required': 'Мінімальний вік є обов’язковим полем.',
  }),
  category: Joi.string().required().messages({
    'string.base': 'Категорія повинна бути текстом.',
    'string.empty': 'Категорія не може бути порожньою.',
    'any.required': 'Категорія є обов’язковим полем.',
  }),
  price: Joi.number().integer().min(0).required().messages({
    'number.base': 'Ціна повинна бути числом.',
    'number.integer': 'Ціна повинна бути цілим числом.',
    'number.min': 'Ціна не може бути меншою за 0.',
    'any.required': 'Ціна є обов’язковим полем.',
  }),
});

export const updateTourSchema = Joi.object({
  title: Joi.string().min(3).max(100).messages({
    'string.base': 'Назва туру повинна бути текстом.',
    'string.empty': 'Назва туру не може бути порожньою.',
    'string.min': 'Назва туру повинна містити щонайменше 3 символи.',
    'string.max': 'Назва туру не може перевищувати 100 символів.',
  }),
  description: Joi.string().messages({
    'string.base': 'Опис туру повинен бути текстом.',
    'string.empty': 'Опис туру не може бути порожнім.',
  }),
  minimumAge: Joi.number().integer().min(0).messages({
    'number.base': 'Мінімальний вік повинен бути числом.',
    'number.integer': 'Мінімальний вік повинен бути цілим числом.',
    'number.min': 'Мінімальний вік не може бути меншим за 0.',
  }),
  category: Joi.string().messages({
    'string.base': 'Категорія повинна бути текстом.',
    'string.empty': 'Категорія не може бути порожньою.',
  }),
  price: Joi.number().integer().min(0).messages({
    'number.base': 'Ціна повинна бути числом.',
    'number.integer': 'Ціна повинна бути цілим числом.',
    'number.min': 'Ціна не може бути меншою за 0.',
  }),
});
