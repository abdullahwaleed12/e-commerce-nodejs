const mongoose = require("mongoose");

const subcategorySchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Title must be provided"],
    unique: [true, "This SubCategory title already exsit"],
    minlength: [3, "Title must be at least 3 characters"],
    maxlength: [32, "Title maximum length is 32 characters"],
  },
  slug: {
    type: String,
    lowercase: true
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: "Category",
    required: [true, "This SubCategory must belong to Main Category"],
  }
}, { timestamps: true });

module.exports = mongoose.model("SubCategory", subcategorySchema);


