const asyncHandel = require("express-async-handler");
const slugify = require("slugify");
const brandModle = require("../models/brandModel");
const ApiError = require("../utils/apiError")

// @desc  Get Brands
// @route GET /api/v1/Brands/
// @access Public
exports.getBrands = asyncHandel(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 4;
  const skip = (page - 1) * limit;
  const Brands = await brandModle.find({}).skip(skip).limit(limit);
  res.status(200).json({ result: Brands.length, data: Brands });
});


// @desc  Get brands by id
// @route GET /api/v1/brands/:id
// @access Public
exports.getBrand = asyncHandel(async (req, res, next) => {
  const { id } = req.params;
  const brand = await brandModle.findById(id);
  if (!brand) {
    // res.status(404).json({ msg: `this Category id ${id} not found` });
    return  next(new ApiError(`this Category id ${id} not found`, 404));
  }
  res.status(200).json({ data: brand });
});

// @desc  Create brand
// @route POST /api/v1/brands/
// @access Private
exports.createbrand = asyncHandel(async (req, res) => {
  const {name} = req.body;
  const brand = await brandModle.create({ name, slug: slugify(name) });
  res.status(201).json({ data: brand });
});


// @desc  Update spicefic brand
// @route POST /api/v1/brands/:id
// @access Public
exports.updateBrand = asyncHandel(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const brand = await brandModle.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );

  if (!brand) {
    return next(new ApiError(`this Category id ${id} not found`, 404));
  }

  res.status(200).json({ data: brand });
});


// @desc  Delete spicefic Category
// @route DELETE /api/v1/categories/:id
// @access Private
exports.deleteBrand = asyncHandel( async (req, res, next) => {
  const { id } = req.params;
  const brand = await brandModle.findByIdAndDelete(id);
  if (!brand) {
    return next(new ApiError(`this Category id ${id} not found`, 404));
  }

  res.status(204).send()
})

