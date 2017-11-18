const config = require('../../lib/config')
const fs = require('fs')
const sleep = require('await-sleep')

async function run () {
  try {
    // deploy app
    console.log(await config.vxmlapp.deploy('cvp1.dcloud.cisco.com', 'wsmadmin', 'C1sco1234567', fs.createReadStream('/temp/test9375.zip')))

    // wait for app to be fully deployed
    let created = false
    while(!created) {
      await sleep(3000)
      const app = await config.vxmlapp.get('cvp1.dcloud.cisco.com', 'wsmadmin', 'C1sco1234567', 'test9375')
      console.log(app)
      if (app.status === 'CREATED') {
        created = true
      }
    }

    // delete the app
    await config.vxmlapp.delete('cvp1.dcloud.cisco.com', 'wsmadmin', 'C1sco1234567', 'test9375')
    
    // list all apps
    console.log(await config.vxmlapp.list({
      host: 'cvp1.dcloud.cisco.com',
      user: 'wsmadmin',
      pass: 'C1sco1234567',
      q: 'appname:Ferguson'
    }))
  } catch (e) {
    console.log(e.message)
  }
}

run()
.then()
.catch()
