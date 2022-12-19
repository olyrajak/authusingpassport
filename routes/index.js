var express = require("express");
var router = express.Router();
var passport = require("passport");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.get("/failure", function (req, res, next) {
  res.render("failure", { title: "Express" });
});
router.get("/success", function (req, res, next) {
  res.render("success", { title: "Express" });
});
router.get("/auth/github", passport.authenticate("github"));
router.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/failure" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/success");
  }
);
module.exports = router;
