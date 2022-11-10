// MONGOOSE
const mongoose = require("mongoose");

const geoLocationSchema = mongoose.Schema({
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
});

// POSTS SCHEMA
const PostSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },
    isActive: {
      type: Boolean,
      required: true,
      default: false,
    },
    geoLocation: geoLocationSchema,
  },
  {
    timestamps: true,
  }
);

const Posts = mongoose.model("Posts", PostSchema);
module.exports = Posts;
