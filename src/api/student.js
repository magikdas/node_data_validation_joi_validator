const express = require('express');

const router = express.Router();

const constStudentValidate = require('./student_joiValidate.js')

const { check, validationResult } = require('express-validator');

// Read All
router.get('/', async (req, res, next) => {
  try {

    const value = await constStudentValidate.validateStudentDetails(req.body);

    res.json({
      message: 'Hello Get All',
    });
  } catch (error) {
    next(error);
  }


});

// Read One
router.get('/:id', (req, res, next) => {

  const originalString = `
  <div>
    <p>Hey that's <span>somthing</span></p>
    select * from table where 1=1;
  </div>
`;

  //const strippedString = originalString.replace(/(<([^>]+)>)/gi, "");

  if (n = originalString.search(/(<([^>]+)>)/gi)) {
    res.status(500).send({ error: 'Error : special characters found' })
  }
  const strippedString = originalString.replace(/(<([^>]+)>)|=|\*|;/gi, "");

  console.log('strippedString : ' + strippedString);

  res.json({
    message: 'Hello READ One',
  });
});

// Create One
router.post('/', [
  check('first_name').not().isEmpty().withMessage('Name must have more than 5 characters'),
  check('last_name').optional().isLength({ max: 50 }),
  check('gender').isIn(['male', 'female']).withMessage('Gender must be Male or Female'),
  check('mobile').isNumeric(),
  check('email').isEmail().normalizeEmail(),
  check('dob').isDate({ format: 'YYYY-MM-DD' }),
], async (req, res, next) => {
  try {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).jsonp(errors.array());
    } else {
      res.json({
        message: 'Hello Create One : Data is Valid',
      });
    }

  } catch (error) {
    next(error);
  }
});

// Update One
router.put('/:id', (req, res, next) => {
  res.json({
    message: 'Hello Update One',
  });
});

// Delete One
router.delete('/:id', (req, res, next) => {
  res.json({
    message: 'Hello Delete One',
  });
});

module.exports = router;
