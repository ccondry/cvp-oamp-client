const diag = require('./lib/diag')
const config = require('./lib/config')

module.exports = {
  getStatus: diag.getStatus,
  getVersion: diag.getVersion
}
