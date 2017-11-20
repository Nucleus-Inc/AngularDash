module.exports = {
  db: 'mongodb://localhost/dashboard',
  jwt: {
    jwtSecret: 'dashboard',
    jwtSession: {
      session: false
    }
  },
  email: {
    service: 'Gmail',
    user: 'eduardo@nucleus.eti.br',
    pass: '123456789',
    from: 'Eduardo Castro <eduardo@nucleus.eti.br>'
  }
}
