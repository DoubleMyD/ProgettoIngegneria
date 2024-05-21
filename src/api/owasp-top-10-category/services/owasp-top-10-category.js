'use strict';

/**
 * owasp-top-10-category service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::owasp-top-10-category.owasp-top-10-category');
