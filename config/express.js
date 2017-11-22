var config = require('./config.js')
var express = require('express')
var cors = require('cors')
var passport = require('passport')
var flash = require('connect-flash')
var load = require('express-load')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var bodyParserError = require('bodyparser-json-error')
var session = require('express-session')
var helmet = require('helmet')
/* Validators */
var expressValidator = require('express-validator')
var validators = require('./validators.js')
/* Winston logger */
var winston = require('winston')
var expressWinston = require('express-winston')
var WinstonMongo = require('winston-mongodb').MongoDB

module.exports = function () {
  /* Express app */
  var app = express()
  app.use(cors({
    credentials: true,
    origin: true
  }))
  app.set('port', (process.env.PORT || 8080))

  /* Ejs views */
  app.use(require('method-override')())
  app.use(express.static('./public'))
  app.set('view engine', 'ejs')
  app.set('views', './app/views')

  /* Helmet */
  app.use(helmet.frameguard())
  app.use(helmet.xssFilter())
  app.use(helmet.noSniff())
  app.use(helmet.hidePoweredBy({
    setTo: 'PHP 5.6.27'
  }))

  /* Cookie parser */
  app.use(cookieParser())

  /* Body parser */
  app.use(bodyParser.urlencoded({
    extended: true
  }))
  app.use(bodyParser.json())
  app.use(bodyParserError.beautify())

  /* Express session */
  app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
  }))

  /* Passport */
  app.use(passport.initialize())
  app.use(passport.session())

  /* Flash messages */
  app.use(flash())

  /* Express Validator */
  app.use(expressValidator({
    customValidators: validators
  }))

  /* Winston logger */
  app.use(expressWinston.logger({
    transports: [
      new winston.transports.Console({
        json: true,
        colorize: true
      }),
      new WinstonMongo({
        db: config.db
      })
    ],
    skip: function (req, res) {
      return res.statusCode !== 500
    }
  }))

  /* Express load */

  load('models', {
    cwd: 'app'
  })
    .then('libs')
    .then('controllers')
    .then('routes')
    .into(app)

  return app
}
