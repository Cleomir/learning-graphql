const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authorSchema = new Schema({
  name: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  authorId: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("Author", authorSchema);
