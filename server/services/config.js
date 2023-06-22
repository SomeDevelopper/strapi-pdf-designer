'use strict';

/**
 * config.js configuration service
 */

module.exports = ({ strapi }) => {
  return {
    getConfig(key = 'editor') {
      return strapi.plugin('pdf-designer').config(key) ?? {};
    },
  };
};
