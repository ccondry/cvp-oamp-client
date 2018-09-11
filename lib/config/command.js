const request = require('request-promise-native')

module.exports = {
  synchronize: function ({host, user, pass, servers}) {
    const options = {
      url: `https://${host}:8111/cvp-config/command/synchronize`,
      method: 'POST',
      auth: {
        user,
        pass,
        sendImmediately: true
      },
      json: true,
      body: {
        synchronize: {
          servers: {
            server: servers
          }
        }
      }
    }
    return request(options)
  }
}
