import { Core } from '@strapi/strapi';

interface ConfigController {
  getConfig(ctx: any): Promise<void>;
}

const createConfigController = ({ strapi }: { strapi: Core.Strapi }): ConfigController => ({
  async getConfig(ctx) {
    const { configKey } = ctx.params;
    const config = await strapi.plugin('pdf-designer').service('config').getConfig(configKey);
    ctx.send(config);
  },
});

export default createConfigController;