/**
 * email-designer.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */
import { Core } from '@strapi/strapi';
export interface TemplateParams {
    [key: string]: any;
}
export interface TemplateValues {
    [key: string]: any;
}
export interface TemplateService {
    findOne(params: TemplateParams): Promise<any>;
    findMany(params: TemplateParams): Promise<any[]>;
    create(values: TemplateValues): Promise<any>;
    update(params: TemplateParams, values: TemplateValues): Promise<any>;
    delete(params: TemplateParams): Promise<any>;
}
declare const _default: ({ strapi }: {
    strapi: Core.Strapi;
}) => TemplateService;
export default _default;
