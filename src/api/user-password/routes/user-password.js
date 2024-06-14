module.exports = {
  routes: [
     {
      method: 'GET',
      path: '/user-password/:email',
      handler: 'user-password.findUser',
      config: {
        policies: [],
        middlewares: [],
      },
     },
  ],
};
