const router = require("express").Router();
const {
  addPost,
  getPostById,
  updatePost,
  deletePost,
  getPostByLatitudeAndLongitude,
  getPostsByUser,
  getActivePostCount,
  getInActivePostCount,
} = require("../controller/post");
// MIDDLEWARES
const { protect } = require("../middleware/auth");

router.route("/").post(protect, getPostsByUser);
router.route("/:id").get(protect, getPostById);
router.route("/update/:id").put(protect, updatePost);
router.route("/delete/:id").delete(protect, deletePost);
router.route("/allActivePosts").get(protect, getActivePostCount);
router.route("/inactive").get(protect, getInActivePostCount);
router.route("/getByLatitude").post(protect, getPostByLatitudeAndLongitude);
router.route("/add").post(protect, addPost);

module.exports = router;
