const { check } = require("express-validator");
const validatorMiddleware = require("../../middleware/validatorMiddleware");



exports.getBrandValidator = [
  check("id").isMongoId().withMessage("Invalid category ID"),
  validatorMiddleware,
];


exports.createBrandValidator = [
  check("name")
    .notEmpty()
    .withMessage("Title must be provided")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters")
    .isLength({ max: 32 })
    .withMessage("Title maximum length is 32 characters")
  ,
  validatorMiddleware,
];

exports.updateBrandValidator = [
  check("id").isMongoId().withMessage("Invalid category ID"),
  validatorMiddleware,
];

exports.deleteBrandValidator = [
  check("id").isMongoId().withMessage("Invalid category ID"),
  validatorMiddleware,
];