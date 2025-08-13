const { check } = require("express-validator");
const validatorMiddleware = require("../../middleware/validatorMiddleware");



exports.getSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid SubCategory ID"),
  validatorMiddleware,
];


exports.createSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("Title must be provided")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters")
    .isLength({ max: 32 })
    .withMessage("Title maximum length is 32 characters")
  ,
  check("category")
    .isMongoId()
    .withMessage("Invalid Category ID format")
  ,
  validatorMiddleware,
];

exports.updateSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid SubCategory ID"),
  validatorMiddleware,
];

exports.deleteSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid SubCategory ID"),
  validatorMiddleware,
];