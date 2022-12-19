var passport = require("passport");
var GitHubStrategy = require("passport-github").Strategy;
passport.use(
  new GitHubStrategy(
    {
      clientID: "f673a6bf60c38880ccec",
      clientSecret: "8443e1491abfbd90d29ec01feb6e141ce1c1d816",
      callbackURL: "/auth/github/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      //   User.findOrCreate({ githubId: profile.id }, function (err, user) {
      //     return cb(err, user);
      //   });
      console.log(profile);
      done(null, false);
    }
  )
);
