var mongoose = require('mongoose')

module.exports = function () {
  var Admin = mongoose.model('Admin')
  require('./strategies/admin-local.js')(Admin)
}
