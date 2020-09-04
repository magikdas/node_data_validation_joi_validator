const { check } = require('express-validator');


async function validateStudentDetails(object) {
    console.log('Inside : expressValidatorStudentDetails');

    try {
        check('first_name')
            .isEmail();

    } catch (error) {
        throw new Error(error);
    }

};

module.exports = { validateStudentDetails }
