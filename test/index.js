const config = require('../lib/config')

// list all media files
// config.command.synchronizeAll({
//   host: 'cvpoamp.cdxdemo.net',
//   user: 'wsmadmin',
//   pass: 'Pqlamz01Pqlamz01'
// }).then(r => {
//   console.log(r)
// }).catch(e => {
//   console.log(e)
// })

// q = name= VXML, MEDIA , CALL, VXML_STANDALONE, RPT

// list all media servers
config.server.list({
  host: 'cvpoamp.cdxdemo.net',
  user: 'wsmadmin',
  pass: 'Pqlamz01Pqlamz01',
  q: 'type:VXML'
}).then(r => {
  // console.log(JSON.stringify(r, null, 2))
  // list all media servers
  config.command.synchronize({
    host: 'cvpoamp.cdxdemo.net',
    user: 'wsmadmin',
    pass: 'Pqlamz01Pqlamz01',
    servers: r.results.servers.server
  }).then(r2 => {
    console.log('sync started')
    // console.log(JSON.stringify(r2, null, 2))
  }).catch(e => {
    console.log(e.message)
  })
}).catch(e => {
  console.log(e.message)
})
