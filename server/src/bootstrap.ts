import type { Core } from '@strapi/strapi';
import config from "./config"

const bootstrap = async ({ strapi }: { strapi: Core.Strapi }) => {
  const actions = [
    {
      section: "plugins",
      displayName: "Allow access to the PDF Designer interface",
      uid: "menu-link",
      pluginName: config.pluginName,
    },
  ];
  await strapi.admin.services.permission.actionProvider.registerMany(actions);
};

export default bootstrap;
