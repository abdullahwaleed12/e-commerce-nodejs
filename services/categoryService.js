const CategoryModel = require("../models/categoryModel");
const slugify = require("slugify");
const asyncHandel = require("express-async-handler");

// @desc  Get Categories
// @route GET /api/v1/categories/
// @access Public
exports.getCategories = asyncHandel(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 4;
  const skip = (page - 1) * limit;
  const categories = await CategoryModel.find({}).skip(skip).limit(limit);
  res.status(200).json({ result: categories.length, data: categories });
});

// @desc  Get Category by id
// @route GET /api/v1/categories/:id
// @access Public

exports.getCategory = asyncHandel(async (req, res) => {
  const { id } = req.params;
  const category = await CategoryModel.findById(id);
  if (!category) {
    res.status(404).json({ msg: `this Category id ${id} not found` });
  }
  res.status(200).json({ data: category });
});

// @desc  Create Category
// @route POST /api/v1/categories/
// @access Private
exports.createCategory = asyncHandel(async (req, res) => {
  const name = req.body.name;
  const category = await CategoryModel.create({ name, slug: slugify(name) });
  res.status(201).json({ data: category });
});

// @desc  Update spicefic Category
// @route POST /api/v1/categories/:id
// @access Public

exports.updateCategory = asyncHandel(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const category = await CategoryModel.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );

  if (!category) {
    return res.status(404).json({ msg: `This Category id ${id} not found` });
  }

  res.status(200).json({ data: category });
});

// @desc  Delete spicefic Category
// @route DELETE /api/v1/categories/:id
// @access Private


exports.deleteCategory = asyncHandel( async (req, res) => {
  const { id } = req.params;
  const category = await CategoryModel.findByIdAndDelete(id);
  if (!category) {
    return res.status(404).json({ msg: `This Category id ${id} not found` });
  }

  res.status(204).send()
})

