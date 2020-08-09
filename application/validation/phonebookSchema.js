const Joi = require('joi');

exports.contactSchema = Joi.object({
  name: Joi.string()
    .trim()
    .required()
    .pattern(/^[A-Za-z\s\.]+$/)
    .messages({
      'any.required': 'Plase enter your Name',
      'string.pattern.base': 'Please enter valid name',
    }),
  number: Joi.string()
    .trim()
    .required()
    .pattern(/^(?:\+880|0)?(1[3-9]\d{8})$/)
    .message({
      'string.empty': 'mobile number is empty',
      'any.required': 'Plase enter your mobile number',
      'string.pattern.base': 'Please enter valid mobile number',
    }),
});

exports.numberSchema = Joi.object({
  number: Joi.string()
    .trim()
    .required()
    .pattern(/^(?:\+880|0)?(1[3-9]\d{8})$/)
    .message({
      'string.empty': 'mobile number is empty',
      'any.required': 'Plase enter your mobile number',
      'string.pattern.base': 'Please enter valid mobile number',
    }),
});

exports.updateNumberSchema = Joi.object({
  currentNumber: Joi.string()
    .trim()
    .required()
    .pattern(/^(?:\+880|0)?(1[3-9]\d{8})$/)
    .message({
      'string.empty': 'Current mobile number is empty',
      'any.required': 'Plase enter your current mobile number',
      'string.pattern.base': 'Please enter current valid mobile number',
    }),

  newNumber: Joi.string()
    .trim()
    .required()
    .pattern(/^(?:\+880|0)?(1[3-9]\d{8})$/)
    .message({
      'string.empty': 'New mobile number is empty',
      'any.required': 'Plase enter your new mobile number',
      'string.pattern.base': 'Please enter new valid mobile number',
    }),
});
