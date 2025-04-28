import Joi from 'joi';

export const addFeedbackSchema = Joi.object({
  tourId: Joi.string().required().messages({
    'string.base': 'ID туру повинен бути текстом.',
    'string.empty': 'ID туру не може бути порожнім.',
    'any.required': 'ID туру є обов’язковим полем.',
  }),
  text: Joi.string().min(10).max(500).required().messages({
    'string.base': 'Текст відгуку повинен бути текстом.',
    'string.empty': 'Текст відгуку не може бути порожнім.',
    'string.min': 'Текст відгуку повинен містити щонайменше 10 символів.',
    'string.max': 'Текст відгуку не може перевищувати 500 символів.',
    'any.required': 'Текст відгуку є обов’язковим полем.',
  }),
  rating: Joi.number().integer().min(1).max(5).required().messages({
    'number.base': 'Рейтинг повинен бути числом.',
    'number.integer': 'Рейтинг повинен бути цілим числом.',
    'number.min': 'Рейтинг не може бути меншим за 1.',
    'number.max': 'Рейтинг не може бути більшим за 5.',
    'any.required': 'Рейтинг є обов’язковим полем.',
  }),
});
