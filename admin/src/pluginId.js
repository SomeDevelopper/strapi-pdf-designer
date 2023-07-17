const pluginPkg = require('../../package.json');

const pluginId = pluginPkg.name.replace(/^@numengie\D/i, '');

module.exports = pluginId;
