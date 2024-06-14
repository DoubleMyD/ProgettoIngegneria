module.exports = {
  routes: [
    { // Path defined with a regular expression
      method: 'GET',
      path: '/patterns/increment-search/:id',
      handler: 'pattern.findAndIncrement',
    }
  ]
}


