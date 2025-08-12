const { check } = require("express-validator");
const validatorMiddleware = require("../../middleware/validatorMiddleware");



exports.getCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category ID"),
  validatorMiddleware,
];


exports.createCategoryValidator = [
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

exports.updateCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category ID"),
  validatorMiddleware,
];

exports.deleteCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category ID"),
  validatorMiddleware,
];