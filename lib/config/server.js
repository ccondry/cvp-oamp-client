const request = require('request-promise-native')
const getAllResults = require('./utils').getAllResults

module.exports = {
  list: function ({host, user, pass, q}) {
    // q = name= VXML, MEDIA , CALL, VXML_STANDALONE, RPT
    const container = 'server'
    const prop = 'server'

    const options = {
      url: `https://${host}:8111/cvp-config/${prop}`,
      qs: {
        q
      },
      auth: {
        user,
        pass,
        sendImmediately: true
      },
      json: true
    }
    return request(options)
  }
}
