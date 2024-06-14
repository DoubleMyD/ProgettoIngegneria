'use strict';

/**
 * pattern controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::pattern.pattern',
  ({ strapi }) => ({
    async findAndIncrement(ctx, next) {
      try {
        const { id } = ctx.params;

        // Fetch the pattern
        //const pattern = await strapi.entityService.findOne('api::pattern.pattern', id);

        const pattern = await strapi.entityService.findOne('api::pattern.pattern', id, {
          populate: '*', // Populate all fields
        });

        if (!pattern) {
          return ctx.notFound('Pattern not found');
        }

        // Increment the search counter
        const updatedPattern = await strapi.entityService.update('api::pattern.pattern', id, {
          data: {
            searchCounter: (pattern.searchCounter || 0) + 1,
          },
        });
/*
        const formattedResponse = {
          data: {
            id: pattern.id,
            attributes: {
              ...pattern,
            },
          },
          meta: {},
        };*/

        return pattern;
      } catch (error) {
        ctx.throw(500, error);
      }
    }
  })

);
