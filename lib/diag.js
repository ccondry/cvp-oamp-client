const axios = require('axios')
const htmlparser = require("htmlparser2")

function parseHtml (html) {
  return new Promise(function(resolve, reject) {
    const handler = new htmlparser.DomHandler(function (error, dom) {
      if (error) reject(error)
      else resolve(dom)
    })
    const parser = new htmlparser.Parser(handler)
    parser.write(html)
    parser.end()
  })
}

function parseMultiDataLine (container, data) {
  const dash = data.indexOf(' - ')
  const comma = data.indexOf(', ')
  // first word
  const firstWord = data.slice(0, dash)
  const firstSet = data.slice(dash + 3, comma)
  const secondSet = data.substring(comma + 2)
  parseSingleDataLine(container, firstSet, firstWord + ' ')
  parseSingleDataLine(container, secondSet, firstWord + ' ')
}

function parseSingleDataLine (container, data, prefix = '') {
  const delimiter = data.indexOf(':')
  const key = data.slice(0, delimiter)
  const value = data.slice(delimiter + 2)
  container[prefix + key] = value
}

async function getStatus (host) {
  try {
    const response = await axios.get(`http://${host}:8000/cvp/diag?oper=port_state`)
    if (response.status >= 200 && response.status < 300) {
      const parsed = await parseHtml(response.data)
      // console.log(parsed)
      // find the text elements in the body of the HTML
      const elements = parsed[0].children.find(v => {
        return v.name === 'body'
      }).children.find(v => {
        return v.name === 'font'
      }).children.filter(v => {
        return v.type === 'text'
      })
      let ret = {}
      // get just the data attribute of each element
      for (const element of elements) {
        // remove whitespace characters except single space
        let data = element.data.replace(/[\r\n\t]/g, '')
        if (data.length) {
          if (data.indexOf(',') >= 0) {
            // multi-data line
            parseMultiDataLine(ret, data)
          } else {
            // single-data line
            parseSingleDataLine(ret, data)
          }
        } else {
          // ignore empty strings
        }
      }
      return ret
    } else {
      // throw 'request status was ' + response.status + ' - ' + response.statusMessage
      throw 'request status was ' + response.status
    }
  } catch (error) {
    throw error
  }
}

// Call Server version
async function getVersion (host) {
  const result = await getStatus(host)
  const version = result['Call Server Version']
  return version
}

module.exports = {
  getStatus,
  getVersion
}
