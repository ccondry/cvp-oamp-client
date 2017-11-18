const config = require('../../lib/config')
const fs = require('fs')
const sleep = require('await-sleep')

async function run () {
  try {
    // deploy media file
    console.log(await config.mediafile.deploy('cvp1.dcloud.cisco.com', 'wsmadmin', 'C1sco1234567', fs.createReadStream('/temp/9002.wav'), 'en-us/app/LastAgent/', '9002.wav'))

    // wait for media file to be fully deployed
    let created = false
    while(!created) {
      await sleep(3000)
      const media = await config.mediafile.get('cvp1.dcloud.cisco.com', 'wsmadmin', 'C1sco1234567', 'en-us/app/LastAgent/9002.wav')
      if (media.status === 'CREATED') {
        created = true
      }
    }

    // get media file content
    const content = await config.mediafile.getContent('cvp1.dcloud.cisco.com', 'wsmadmin', 'C1sco1234567', 'en-us/app/LastAgent/9002.wav')
    console.log('media file content length = ' + content.length)

    // delete the media file
    await config.mediafile.delete('cvp1.dcloud.cisco.com', 'wsmadmin', 'C1sco1234567', 'en-us/app/LastAgent/9002.wav')
    console.log('media file deleted')

    // list all media files
    console.log(await config.mediafile.list('cvp1.dcloud.cisco.com', 'wsmadmin', 'C1sco1234567'))
  } catch (e) {
    console.log(e)
  }
}

run()
.then()
.catch()
