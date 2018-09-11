// const cvpOampClient = require('./index.js')
// const url = 'https://cvp1.dcloud.cisco.com:9443/'
// const user = 'wsmadmin'
// const pass = 'C1sco1234567'
//
// let cvp = new cvpOampClient(url, user, pass)
//
// cvp.config.mediafile.list({ q: 'filename:31ord.wav AND path:en-us/sys' })
// .then(response => {
//   console.log(response)
// })
// .catch(error => {
//   console.log(error)
// })

const cvp = require('./index.js')
const host = 'cvp1.dcloud.cisco.com'
const user = 'wsmadmin'
const pass = 'C1sco1234567'

// cvp.config.mediafile.list({
//   host,
//   user,
//   pass,
//   q: 'filename:31ord.wav AND path:en-us/sys'
// })
// .then(response => {
//   console.log(response)
// })
// .catch(error => {
//   console.log(error)
// })

const fs = require('fs')
const ffmpeg = require('fluent-ffmpeg')

const inspect = require('util').inspect
const { Writable, Duplex } = require('stream')

ffmpeg.setFfmpegPath('/Users/coty/ffmpeg/ffmpeg')

function streamToBuffer(stream) {
  return new Promise((resolve, reject) => {
    const buffers = []
    stream.on('error', reject)
    stream.on('data', (data) => buffers.push(data))
    stream.on('end', () => resolve(Buffer.concat(buffers)))
  })
}

function bufferToStream(buffer) {
  const stream = new Duplex()
  stream.push(buffer)
  stream.push(null)
  return stream
}

async function go() {
  try {
    // convert file to law for CVP
    // fs.createReadStream('/temp/test.wav')
    let ffstream
    // let buf = new Buffer()
    let command = await ffmpeg('/temp/test.wav')
    .audioBitrate('16k')
    .audioCodec('pcm_mulaw')
    .audioFrequency('8k')
    .format('wav')
    // .output(newPath)
    .on('end', async function() {
      console.log('ffmpeg finished converting audio to ulaw stream')
      const buffer = await streamToBuffer(ffstream)
      console.log('got buffer from stream', buffer)
      const response = await cvp.config.mediafile.deploy({
        host,
        user,
        pass,
        stream: ffstream,
        path: 'en-us/',
        filename: 'test.wav'
      })
      console.log('cvp oamp response', response)
    }).pipe(ffstream, {
       end: true
    })


    // ffstream.on('data', function(chunk) {
    //     // console.log('ffmpeg just wrote ' + chunk.length + ' bytes');
    // });

    // console.log('ffstream', ffstream)
    // console.log('got pipe from ffmpeg')

    // recreate the buffer object, and then make a stream out of it
    // const newStream = bufferToStream(new Buffer(buffer))
    // console.log('got stream from buffer')
    // console.log('successfully converted audio file to ulaw. new file is', newPath)


  } catch (e) {
    throw e
  }
}

go()
.then(response => {
  console.log(response)
})
.catch(error => {
  console.log(error)
})
