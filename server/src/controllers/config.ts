import { Core } from '@strapi/strapi';
import configImport from "../config";

export interface ConfigController {
  getConfig(ctx: any): Promise<void>;
  getFullConfig(ctx: any): Promise<void>;
}

const controller = ({ strapi }: { strapi: Core.Strapi }): ConfigController => ({
  getConfig: async (ctx) => {
    const { configKey } = ctx.params;
    const config = await strapi.plugin(configImport.pluginName).service("config").getConfig(configKey);
    ctx.send(config);
  },
  getFullConfig: async (ctx) => {
    const config = await strapi.config.get(`plugin::${configImport.pluginName}`);
    ctx.send(config);
  },
  
});

export default controller;