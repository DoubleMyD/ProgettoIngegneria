'use strict';

/**
 * A set of functions called "actions" for `password-prova`
 */

module.exports = {
  findPassword: async (ctx, next) => {
     try {
      return await strapi.db.query('plugin::users-permissions.user').findOne({
        where: { email: "dododag05@gmail.com" } });
           } catch (err) {
       ctx.body = err;
     }
   }
};
