const diag = require('../diag')

diag.portState('cvp1')
.then(response => {
  console.log(response)
})
.catch(error => {
  console.log(error)
})
