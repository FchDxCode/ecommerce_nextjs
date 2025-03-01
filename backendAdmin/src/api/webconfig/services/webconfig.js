'use strict';

/**
 * webconfig service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::webconfig.webconfig');
