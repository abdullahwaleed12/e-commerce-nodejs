const mongoose = require("mongoose");
const brandSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Title must be provided"],
    unique: [true, "This category title already exsit"],
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

module.exports = mongoose.model("Brand", brandSchema);

