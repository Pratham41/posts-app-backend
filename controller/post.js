const Posts = require("../model/post");
require("dotenv").config();

exports.addPost = async (req, res) => {
  try {
    const post = await Posts.create({
      title: req.body.title,
      body: req.body.body,
      created_by: req.body.created_by,
      isActive: req.body.isActive,
      geoLocation: req.body.geoLocation,
    });

    if (post) {
      return res.status(201).json({
        _id: post._id,
        title: post.title,
        body: post.body,
        created_by: post.created_by,
        isActive: post.isActive,
        geoLocation: post.geoLocation,
      });
    } else {
      return res.status(400).json("Invalid data !");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error !");
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    if (post) {
      return res.status(201).json({
        _id: post._id,
        title: post.title,
        body: post.body,
        created_by: post.created_by,
        isActive: post.isActive,
        geoLocation: post.geoLocation,
      });
    } else {
      return res.status(400).json("Invalid data !");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error !");
  }
};

exports.getPostByLatitudeAndLongitude = async (req, res) => {
  try {
    const filter = {
      "geoLocation.latitude": req.body.geoLocation.latitude,
      "geoLocation.longitude": req.body.geoLocation.longitude,
    };
    const post = await Posts.findOne(filter);

    if (post) {
      return res.status(201).json({
        _id: post._id,
        title: post.title,
        body: post.body,
        created_by: post.created_by,
        isActive: post.isActive,
        geoLocation: post.geoLocation,
      });
    } else {
      return res.status(400).json("Invalid data !");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error !");
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);

    if (post) {
      (post.title = req.body.title),
        (post.body = req.body.body),
        (post.created_by = req.body.created_by),
        (post.isActive = req.body.isActive || false),
        (post.geoLocation = req.body.geoLocation);

      const updatedPost = await post.save();
      if (updatedPost) {
        return res.status(201).json({
          _id: post._id,
          title: post.title,
          body: post.body,
          created_by: post.created_by,
          isActive: post.isActive,
          geoLocation: post.geoLocation,
        });
      }
    } else {
      return res.status(400).json("Invalid data !");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error !");
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Posts.findByIdAndRemove(req.params.id);
    if (post) {
      return res.status(200).json("post deleted successfully !");
    } else {
      return res.status(400).json("Invalid data !");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error !");
  }
};

exports.getPostsByUser = async (req, res) => {
  try {
    const filter = { created_by: req.body.userId };
    const post = await Posts.find(filter);
    if (post) {
      return res.status(201).json(post);
    } else {
      return res.status(400).json("Invalid data !");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error !");
  }
};

exports.getActivePostCount = async (req, res) => {
  try {
    const filter = { isActive: true };
    const posts = await Posts.find(filter);
    if (posts?.length > 0) {
      return res.status(201).json(posts.length);
    } else {
      return res.status(400).json("Invalid data !");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error active !");
  }
};

exports.getInActivePostCount = async (req, res) => {
  try {
    const filter = { isActive: false };
    const posts = await Posts.find(filter);
    if (posts?.length > 0) {
      return res.status(201).json(posts.length);
    } else {
      return res.status(400).json("Invalid data !");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error !");
  }
};
