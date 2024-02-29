const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  signup,
  login,
  sendOtp,
  user,
  addRole,
  verifyOtp,
  googleAuth,
  searchUser,
  getUserById,
  updateUserById,
} = require("../../controlllers/auth/authController");

router.post("/addrole", addRole);
router.post("/signup", signup);
router.post("/sendOtp", sendOtp);
router.post("/verifyOtp", verifyOtp);
router.post("/login", login);
router.post("/searchUser", searchUser);
router.get("/users", user);
router.get("/user/:id" , getUserById)
router.put("/updateUser/:id",updateUserById)

router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/callback', passport.authenticate('google', {
  failureRedirect: '/'
}), (req, res) => {
  // console.log(req.body);
  // res.redirect('/auth/login')
});

router.get('/logout', (req, res, next) => {
  req.logout((error) => {
    if (error) { return next(error) }
    res.redirect('/')
  })
})

module.exports = router;
