var mongoose = require('mongoose');
var CPF = require('cpf_cnpj').CPF;
var CNPJ = require('cpf_cnpj').CNPJ;
var zxcvbn = require('zxcvbn');

module.exports = {
  isObjectId: function (_id) {
    return mongoose.Types.ObjectId.isValid(_id);
  },
  isValidPassword: function (password) {
    return !!(password && zxcvbn(password).score >= 2);
  },
  isValidCPF: function (cpf) {
    return !!(cpf && CPF.isValid(CPF.format(cpf)));
  },
  isValidCNPJ: function (cnpj) {
    return !!(cnpj && CNPJ.isValid(CNPJ.format(cnpj)));
  },
  isPhoneNumber: function (number) {
    var numberExp = new RegExp(/(55)[0-9]{11}/);
    return numberExp.test(number);
  }
}
