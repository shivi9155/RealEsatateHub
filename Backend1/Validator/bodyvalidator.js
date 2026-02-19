const { body } = require("express-validator");

const registrationValidator = [
    body("email")
        .isEmail()
        .withMessage("Invalid Email"),

    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters")
];

module.exports = { registrationValidator };
