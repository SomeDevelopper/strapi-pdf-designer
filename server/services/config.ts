/**
 * config.js configuration service
 */

import { Core } from '@strapi/strapi';

interface ConfigService {
  getConfig(key?: string): Record<string, any>;
}

export default ({ strapi }: { strapi: Core.Strapi }): ConfigService => {
  return {
    getConfig(key = 'editor'): Record<string, any> {
      return strapi.plugin('pdf-designer').config(key) ?? {};
    },
  };
};