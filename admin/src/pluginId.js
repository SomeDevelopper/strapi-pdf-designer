const pluginPkg = require('../../package.json');

const pluginId = pluginPkg.name.replace(/^strapi\D/i, '');

module.exports = pluginId;
