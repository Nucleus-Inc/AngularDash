var mongoose = require('mongoose')

module.exports = function () {
  var Admin = mongoose.model('Admin')
  var Seller = mongoose.model('Seller')

  require('./strategies/admin-local.js')(Admin)
  require('./strategies/seller-local.js')(Seller)
}
