const request = require('request-promise-native')
const getAllResults = require('./utils').getAllResults

module.exports = {
  deploy: async function ({host, user, pass, stream}) {
    try {
      const options = {
        url: `https://${host}:8111/cvp-config/vxmlapp/deploy`,
        method: 'POST',
        auth: {
          user,
          pass,
          sendImmediately: true
        },
        headers: {
          accept: 'application/json',
          'content-type': 'multipart/form-data'
        },
        formData: {
          vxmlapp: stream,
          vxmlDeployConfig: '{"vxmlapp": ""}'
        }
      }

      const response = await request(options)
      return response
    } catch (error) {
      throw error
    }
  },
  delete: async function ({host, user, pass, appName}) {
    try {
      const url = `https://${host}:8111/cvp-config/vxmlapp/${appName}`
      const options = {
        method: 'DELETE',
        auth: {
          user,
          pass,
          sendImmediately: true
        },
        headers: {
          accept: 'application/json'
        }
      }

      await request(url, options)
      return
    } catch (error) {
      throw error
    }
  },
  get: async function ({host, user, pass, appName}) {
    try {
      const url = `https://${host}:8111/cvp-config/vxmlapp/${appName}`
      const options = {
        auth: {
          user,
          pass,
          sendImmediately: true
        },
        json: true
      }

      const response = await request(url, options)
      return response.vxmlapp
    } catch (error) {
      throw error
    }
  },
  list: async function ({host, user, pass, q}) {
    try {
      const container = 'vxmlapps'
      const prop = 'vxmlapp'

      const options = {
        url: `https://${host}:8111/cvp-config/${prop}`,
        qs: {
          resultsPerPage: 50,
          startIndex: 0,
          summary: true,
          q
        },
        auth: {
          user,
          pass,
          sendImmediately: true
        },
        json: true
      }

      return getAllResults(options, container, prop)
    } catch (error) {
      throw error
    }
  }
}
