const express = require("express")
const router = express.Router()
const authController = require("../controllers/authController")

router.route("/signup")
// .get(authController.getSignup)
.post(authController.signup)

router.route("/login")
// .get(authController.getLogin)
.post(authController.login)

router.route("/forgotPassword").post(authController.forgotPassword)
router.route("/passwordReset/:token").patch(authController.passwordReset)

module.exports = router