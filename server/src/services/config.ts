/**
 * config.js configuration service
 */

import { Core } from '@strapi/strapi';
import configImport from "../config";

export interface ConfigService {
  getConfig(key?: string): Record<string, any>;
}

export default ({ strapi }: { strapi: Core.Strapi }): ConfigService => {
  return {
    getConfig(key = 'editor'): Record<string, any> {
      return strapi.plugin(configImport.pluginName).config(key) ?? {};
    },
  };
};