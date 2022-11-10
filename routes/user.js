const router = require("express").Router();
const { loginUser, registerUser } = require("../controller/user");
// MIDDLEWARES
const { protect } = require("../middleware/auth");

router.route("/login").post(loginUser);
router.route("/register").post(registerUser);

module.exports = router;
