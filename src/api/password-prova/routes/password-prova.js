module.exports = {
  routes: [
     {
      method: 'GET',
      path: '/password-prova',
      handler: 'password-prova.findPassword',
      config: {
        policies: [],
        middlewares: [],
      },
     },
  ],
};
