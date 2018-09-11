const config = require('./lib/config')

async function run () {
  try {
    // list media files
    console.log(await config.mediafile.list({
      host: 'cvp1.dcloud.cisco.com',
      user: 'wsmadmin',
      pass: 'C1sco1234567',
      // q: 'filename:31ord.wav AND path:en-us/sys'
      q: 'path:en-us/app/lastagent'
    }))
  } catch (e) {
    console.log(e.message)
  }
}

run()
.then()
.catch()
