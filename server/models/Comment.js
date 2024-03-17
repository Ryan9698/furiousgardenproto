const mongoose = require("mongoose");

const { Schema } = mongoose;

const commentSchema = new Schema({
  content: {
    type: String,
    requried: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
