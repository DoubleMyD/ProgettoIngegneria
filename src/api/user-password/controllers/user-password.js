'use strict';

/**
 * A set of functions called "actions" for `user-password`
 */

module.exports = {
    findUser: async (ctx, next) => {
       try {
        const email = ctx.params.email;
        return await strapi.db.query('plugin::users-permissions.user').findOne({
          where: { email: email } });
             } catch (err) {
         ctx.body = err;
       }
     }
};
