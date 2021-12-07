
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./material-ui-phone-field.cjs.production.min.js')
} else {
  module.exports = require('./material-ui-phone-field.cjs.development.js')
}
