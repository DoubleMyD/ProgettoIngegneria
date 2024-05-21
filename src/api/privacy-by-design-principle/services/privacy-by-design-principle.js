'use strict';

/**
 * privacy-by-design-principle service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::privacy-by-design-principle.privacy-by-design-principle');
