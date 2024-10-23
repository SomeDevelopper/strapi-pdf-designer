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

export default ({ strapi }: { strapi: Core.Strapi }): TemplateService => {
  return {
    /**
     * Promise to fetch a template.
     * @return {Promise}
     */
    async findOne(params: TemplateParams) {
      try {
        const response = await strapi.query('plugin::pdf-designer-5.pdf-template').findOne({ where: params });
        if (!response) {
          console.log('An error has occurred');
        }
        return response;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Promise to fetch all templates.
     * @return {Promise}
     */
    async findMany(params: TemplateParams) {
      try {
        const response = await strapi.query('plugin::pdf-designer-5.pdf-template').findMany({ where: params });
        if (!response) {
          throw new Error('No templates found');
        }
        return response;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

    /**
     * Promise to add a template.
     * @return {Promise}
     */
    async create(values: TemplateValues) {
      try {
        const test = await strapi.query('plugin::pdf-designer-5.pdf-template').create({ data: values });
        if (!test) {
          throw new Error('Failed to create template');
        }
        return {
          values: values,
          templateCreate: test,
          success: true
        };
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

    /**
     * Promise to edit a template.
     * @return {Promise}
     */
    async update(params: TemplateParams, values: TemplateValues) {
      try {
        const response = await strapi.query('plugin::pdf-designer-5.pdf-template').update({ where: params, data: values });
        if (!response) {
          throw new Error('Failed to update template');
        }
        return response;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

    /**
     * Promise to remove a template.
     * @return {Promise}
     */
    async delete(params: TemplateParams) {
      try {
        const response = await strapi.query('plugin::pdf-designer-5.pdf-template').delete({ where: params });
        if (!response) {
          throw new Error('Failed to delete template');
        }
        return response;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  };
};

