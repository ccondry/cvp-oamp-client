# CVP OAMP client
This is a JavaScript implementation of a growing collection of CVP OAMP and
diagnostic portal REST APIs.

## Example Usage
```js
const cvpOampClient = require('cvp-oamp-client')
const url = 'https://cvp1.dcloud.cisco.com:9443/'
const username = 'wsmadmin'
const password = 'C1sco1234567'

// init client
let cvp = new cvpOampClient(url, username, password)

cvp.config.mediafile.list({ q: 'filename:31ord.wav AND path:en-us/sys' })
.then(response => {
  console.log(response)
})
.catch(error => {
  console.log(error)
})
```
