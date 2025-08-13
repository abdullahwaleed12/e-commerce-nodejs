const express = require("express");

const { 
  createSubCategory, 
  getSubCategories,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
  setCategoryIdInBody,
  createFilterObject
} = require("../services/subCategoryService");
const { 
  createSubCategoryValidator,
  getSubCategoryValidator,
  updateSubCategoryValidator,
  deleteSubCategoryValidator
} = require("../utils/validator/subCategoryValidator")

const router = express.Router({ mergeParams: true });


router.route("/")
  .post(setCategoryIdInBody,  createSubCategoryValidator ,createSubCategory)
  .get(createFilterObject ,getSubCategories)

router.route("/:id")
  .get(getSubCategoryValidator ,getSubCategory)
  .put( updateSubCategoryValidator ,updateSubCategory)
  .delete( deleteSubCategoryValidator ,deleteSubCategory)
module.exports = router