const asyncHandel = require("express-async-handler");
const slugify = require("slugify");
const SubCategoryModel = require("../models/subCategoryModel");
const ApiError = require("../utils/apiError");

exports.setCategoryIdInBody = (req, res, next) => {
  if(!req.body.category) req.body.category = req.params.categoryId;
  next()
}
// @desc  Create SubCategory
// @route POST /api/v1/subcategories/
// @access Private
exports.createSubCategory = asyncHandel(async (req, res) => {
  if(!req.body.category) req.body.category = req.params.categoryId;
  
  const { name , category } = req.body;
  const subcategory = await SubCategoryModel.create({
     name, 
     slug: slugify(name),
     category,
    });
  res.status(201).json({ data: subcategory });
});

exports.createFilterObject = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryId) filterObject = { category: req.params.categoryId }
  req.filterObj = filterObject;
  next();
} 
// @desc  Get subCategories
// @route GET /api/v1/subcategories/
// @access Public
exports.getSubCategories = asyncHandel(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 4;
  const skip = (page - 1) * limit;
  const subcategories = await SubCategoryModel.find(req.filterObj).skip(skip).limit(limit).populate(
    { path: "category" , select: "name -_id"});
  res.status(200).json({ result: subcategories.length, data: subcategories });
});


//@desc   GET /api/v1/categories/:categoryId/subcategories

// @desc  Get subCategory by id
// @route GET /api/v1/subcategories/:id
// @access Public
exports.getSubCategory = asyncHandel(async (req, res, next) => {
  const { id } = req.params;
  const subCategory = await SubCategoryModel.findById(id).populate(
    { path: "category" , select: "name -_id"});
  if (!subCategory) {
    return  next(new ApiError(`this subCategory id ${id} not found`, 404));
  }
  res.status(200).json({ data: subCategory });
});

// @desc  Update spicefic subCategory
// @route POST /api/v1/subcategories/:id
// @access Public
exports.updateSubCategory = asyncHandel(async (req, res, next) => {
  const { id } = req.params;
  const { name , category } = req.body;

  const subCategory = await SubCategoryModel.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name), category },
    { new: true }
  );

  if (!subCategory) {
    return next(new ApiError(`this subCategory id ${id} not found`, 404));
  }

  res.status(200).json({ data: subCategory });
});


// @desc  Delete spicefic subCategory
// @route DELETE /api/v1/subcategories/:id
// @access Private
exports.deleteSubCategory = asyncHandel( async (req, res, next) => {
  const { id } = req.params;
  const subCategory = await SubCategoryModel.findByIdAndDelete(id);
  if (!subCategory) {
    return next(new ApiError(`this subCategory id ${id} not found`, 404));
  }

  res.status(204).send()
})