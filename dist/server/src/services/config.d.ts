/**
 * config.js configuration service
 */
import { Core } from '@strapi/strapi';
export interface ConfigService {
    getConfig(key?: string): Record<string, any>;
}
declare const _default: ({ strapi }: {
    strapi: Core.Strapi;
}) => ConfigService;
export default _default;
