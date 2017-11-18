const request = require('request-promise-native')
const getAllResults = require('./utils').getAllResults

module.exports = {
  deploy: async function (host, user, pass, stream, path, filename) {
    try {
      const mediaUploadConfig = {
        mediafile: {
          path,
          filename
        }
      }
      const options = {
        url: `https://${host}:8111/cvp-config/mediafile`,
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
          mediafile: stream,
          mediaUploadConfig: JSON.stringify(mediaUploadConfig)
        }
      }
      const response = await request(options)
      return response
    } catch (error) {
      throw error
    }
  },
  update: async function (host, user, pass, stream, path, filename) {
    try {
      const mediaUploadConfig = {
        mediafile: {
          path,
          filename
        }
      }
      const options = {
        url: `https://${host}:8111/cvp-config/mediafile`,
        method: 'PUT',
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
          mediafile: stream,
          mediaUploadConfig: JSON.stringify(mediaUploadConfig)
        }
      }
      const response = await request(options)
      return response
    } catch (error) {
      throw error
    }
  },
  delete: async function (host, user, pass, path) {
    try {
      const options = {
        url: `https://${host}:8111/cvp-config/mediafile/${path}`,
        method: 'DELETE',
        auth: {
          user,
          pass,
          sendImmediately: true
        }
      }

      await request(options)
      return
    } catch (error) {
      throw error
    }
  },
  get: async function (host, user, pass, path) {
    try {
      const options = {
        url: `https://${host}:8111/cvp-config/mediafile/${path}`,
        auth: {
          user,
          pass,
          sendImmediately: true
        },
        json: true
      }

      const response = await request(options)
      return response.mediafile
    } catch (error) {
      throw error
    }
  },
  getContent: async function (host, user, pass, path) {
    try {
      const options = {
        url: `https://${host}:8111/cvp-config/mediafile/${path}/content`,
        auth: {
          user,
          pass,
          sendImmediately: true
        },
        json: true
      }

      const response = await request(options)
      return response
    } catch (error) {
      throw error
    }
  },
  list: async function (host, user, pass) {
    try {
      const container = 'mediafiles'
      const prop = 'mediafile'
      const options = {
        url: `https://${host}:8111/cvp-config/mediafile`,
        qs: {
          resultsPerPage: 50,
          startIndex: 0,
          summary: true
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
