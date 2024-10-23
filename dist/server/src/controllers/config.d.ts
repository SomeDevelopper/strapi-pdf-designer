import { Core } from '@strapi/strapi';
export interface ConfigController {
    getConfig(ctx: any): Promise<void>;
    getFullConfig(ctx: any): Promise<void>;
}
declare const controller: ({ strapi }: {
    strapi: Core.Strapi;
}) => ConfigController;
export default controller;
