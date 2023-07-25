'use strict';


/**
 * email-designer.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

module.exports = ({ strapi }) => {
  return {
    /**
     * Promise to fetch a template.
     * @return {Promise}
     */
    async findOne(params) {
      try {
        const response = await strapi.query('plugin::pdf-designer.pdf-template').findOne({ where: params });
        if (!response) {
          strapi.log.error('An error has occurred')
        }
        return 
      } catch (error) {
        strapi.log.error(error)
      }
    },

    /**
     * Promise to fetch all templates.
     * @return {Promise}
     */
    findMany(params) {
      return strapi.query('plugin::pdf-designer.pdf-template').findMany({ where: params });
    },

    /**
     * Promise to add a template.
     * @return {Promise}
     */
    async create(values) {
      const test = await strapi.query('plugin::pdf-designer.pdf-template').create({ data: values });
      return {
        values: values,
        templateCreate : test,
        success: true
      }
    },

    /**
     * Promise to edit a template.
     * @return {Promise}
     */
    async update(params, values) {
      // FIXME: ⬇︎ avoid duplicating templateReferenceId field
      
      return strapi.query('plugin::pdf-designer.pdf-template').update({ where: params, data: values });
    },

    /**
     * Promise to remove a template.
     * @return {Promise}
     */
    async delete(params) {
      return strapi.query('plugin::pdf-designer.pdf-template').delete({ where: params });
    },
  };
};
