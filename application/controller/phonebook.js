const { contactSchema, numberSchema, updateNumberSchema } = require('../validation/phonebookSchema');
const { insertData, getAllContact, getDataByNumber, updateContact, deleteContact } = require('../model/phonebook');
const { asyncController } = require('../../middleware/async');
const { addCountryCode } = require('../../utils/addCountryCode');

/**
 * @swagger
 * /phonebook:
 *  post:
 *    description: Create new mobile number in phonebook
 *    consumes:
 *      - application/x-www-form-urlencoded
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: name
 *        description: user name
 *        in: formData
 *        type: string
 *        required: true
 *      - name: number
 *        description: user mobile number
 *        in: formData
 *        type: string
 *        required: true
 *    responses:
 *      '201':
 *        description: Successfully, new number added on phonebook
 *      '400':
 *        description: Validation Error
 */
exports.create = asyncController(async (req, res) => {
  const validateResult = contactSchema.validate({
    name: req.body.name,
    number: req.body.number,
  });

  if (validateResult.error) {
    return res.status(400).json({
      success: false,
      result: {
        error: validateResult.error.details[0].message,
      },
    });
  }

  validateResult.value.number = addCountryCode(validateResult.value.number);

  if (await insertData(validateResult.value)) {
    res.status(201).json({
      success: true,
      result: {
        message: 'Successfully, new number added on phonebook',
      },
    });
  } else {
    res.status(400).json({
      success: false,
      result: {
        error: 'number alredy exist',
      },
    });
  }
});

/**
 * @swagger
 * /phonebook:
 *  put:
 *    description: Edit a contact number using old contact number
 *    consumes:
 *      - application/x-www-form-urlencoded
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: currentNumber
 *        description: user current mobile number
 *        in: formData
 *        type: string
 *        required: true
 *      - name: newNumber
 *        description: user new mobile number
 *        in: formData
 *        type: string
 *        required: true
 *    responses:
 *      '200':
 *        description: Successfully, new number added on phonebook
 *      '400':
 *        description: Validation Error
 */
exports.update = asyncController(async (req, res) => {
  const validateResult = updateNumberSchema.validate({
    currentNumber: req.body.current_number,
    newNumber: req.body.new_number,
  });

  if (validateResult.error) {
    return res.status(400).json({
      success: false,
      result: {
        error: validateResult.error.details[0].message,
      },
    });
  }

  validateResult.value.currentNumber = addCountryCode(validateResult.value.currentNumber);
  validateResult.value.newNumber = addCountryCode(validateResult.value.newNumber);

  const result = await updateContact(validateResult.value);

  if (result.newNumberExist) {
    return res.status(400).json({
      success: false,
      result: {
        error: 'new number registered with someone else',
      },
    });
  } else if (result.modified) {
    return res.json({
      success: false,
      result: {
        message: 'number successfully updated',
      },
    });
  } else {
    return res.status(400).json({
      success: false,
      result: {
        error: 'current number not exist',
      },
    });
  }
});

/**
 * @swagger
 * /phonebook/{number}:
 *  get:
 *    description: Get user contact details by a mobile number
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: number
 *        description: user mobile number
 *        in: path
 *        type: string
 *        required: true
 *    responses:
 *      '200':
 *        description: Successfully, new number added on phonebook
 *      '400':
 *        description: Validation Error
 */
exports.read = asyncController(async (req, res) => {
  const validateResult = numberSchema.validate({
    number: req.params.number,
  });

  if (validateResult.error) {
    return res.status(400).json({
      success: false,
      result: {
        error: validateResult.error.details[0].message,
      },
    });
  }

  validateResult.value.number = addCountryCode(validateResult.value.number);
  res.json({
    success: true,
    result: {
      data: await getDataByNumber(validateResult.value),
    },
  });
});

/**
 * @swagger
 * /phonebook:
 *  get:
 *    description: Get all contact numbers
 *    produces:
 *      - application/json
 *    responses:
 *      '200':
 *        description: get all numbers in array
 */
exports.allContact = asyncController(async (req, res) => {
  res.json({
    success: true,
    result: { data: await getAllContact() },
  });
});

/**
 * @swagger
 * /phonebook:
 *  delete:
 *    description: Delete a given number
 *    consumes:
 *      - application/x-www-form-urlencoded
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: number
 *        description: user mobile number
 *        in: formData
 *        type: string
 *        required: true
 *    responses:
 *      '200':
 *        description: Successfully, number is deleted
 *      '400':
 *        description: Validation Error
 */
exports.delete = asyncController(async (req, res) => {
  const validateResult = numberSchema.validate({
    number: req.body.number,
  });

  if (validateResult.error) {
    return res.status(400).json({
      success: false,
      result: {
        error: validateResult.error.details[0].message,
      },
    });
  }

  validateResult.value.number = addCountryCode(validateResult.value.number);

  if (await deleteContact(validateResult.value)) {
    res.json({
      success: true,
      result: {
        message: 'Successfully, number is deleted',
      },
    });
  } else {
    res.status(400).json({
      success: true,
      result: {
        error: 'number not found',
      },
    });
  }
});
