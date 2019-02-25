const request = require('request-promise-native')

module.exports = {
  getAllResults: async function (options, container, prop) {
    const resultsPerPage = options.qs.resultsPerPage
    const response = await request(options)
    const totalResults = response.results.pageInfo.totalResults
    if (totalResults === '0') {
      // no results - return empty array
      return []
    } else if (totalResults === '1') {
      // return array
      return [response.results[container][prop]]
    } else if (Number(totalResults) <= Number(resultsPerPage)) {
      // we have all results, so return them
      return response.results[container][prop]
    } else {
      // we have more results to get
      let ret = response.results[container][prop]
      const iterations = Math.ceil(Number(totalResults) / Number(resultsPerPage)) - 1
      for (let i = 0; i < iterations; i++) {
        // increase startIndex to get next set of results
        options.qs.startIndex = Number(options.qs.startIndex) + 1
        let response2 = await request(options)
        if (response2.results[container] !== null) {
          let part = response2.results[container][prop]
          // append results to apps list
          if (Array.isArray(part)) {
            ret = ret.concat(part)
          } else {
            ret = ret.push(part)
          }
        }
      }
      return ret
    }
  }
}
