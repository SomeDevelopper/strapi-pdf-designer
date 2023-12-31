'use strict';

module.exports = {
  getConfig: async (ctx) => {
    const { configKey } = ctx.params;
    const config = await strapi.plugin('pdf-designer').service('config').getConfig(configKey);
    ctx.send(config);
  },
};
