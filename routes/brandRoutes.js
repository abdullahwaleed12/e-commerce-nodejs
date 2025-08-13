const express = require("express");
const {
  getBrandValidator,
  updateBrandValidator,
  createBrandValidator,
  deleteBrandValidator
} = require("../utils/validator/brandsValidation")
const { 
  getBrands,
  getBrand,
  createbrand,
  updateBrand,
  deleteBrand
} = require("../services/brandService");

const subCategoriesRoute = require("./subCategoryRoutes")

const router = express.Router();

router.use("/:categoryId/subcategories" , subCategoriesRoute)

router.route("/")
  .get(getBrands)
  .post(createBrandValidator ,createbrand)

router.route("/:id")
  .get(
    getBrandValidator
    ,getBrand
  )
  .put(updateBrandValidator , updateBrand)
  .delete(deleteBrandValidator ,deleteBrand)

module.exports = router;