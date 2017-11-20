var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy

// Serialize the user
module.exports = function (Admin) {

  passport.serializeUser(function (admin, done) {
    done(null, admin._id)
  })

  passport.deserializeUser(function (id, done) {
    Admin.findById(id, function (err, admin) {
      done(err, admin)
    })
  })

  passport.use('admin-local-login', new LocalStrategy({
    // By default, local strategy uses username and password, we will override with email
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass back the entire request to the callback
  },
  function (req, email, password, done) {
    // callback with email and password from our form
    // find a user whose email is the same as the forms email
    // we are checking to see if the user trying to login already exists
    Admin.findOne({
      'email': email
    }, function (err, admin) {
      // if there are any errors, return the error before anything else
      if (err) {
        return done(err)
      } else
      // if no user is found, return the message
      if (admin && new Admin().compareHash(password, admin.password)) {
        return done(null, admin)
      } else {
        return done(null, false)
      }
    })
  }))
}
