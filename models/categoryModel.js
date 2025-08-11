const mongoose = require("mongoose");
const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Title must be provided"],
    unique: [true, "This category title already exist"],
    minlength: [3, "Title must be at least 3 characters"],
    maxlength: [32, "Title maximum length is 32 characters"],
    trim: true
  },
  slug: {
    type: String,
    lowercase: true
  },
  image: String
}, { timestamps: true });

const CategoryModel = mongoose.model("Category", categorySchema);


module.exports = CategoryModel;