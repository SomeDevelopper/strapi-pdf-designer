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
          console.log('An error has occurred')
        }
        return response
      } catch (error) {
        console.log(error)
      }
    },

    /**
     * Promise to fetch all templates.
     * @return {Promise}
     */
    async findMany(params) {
      try {
        const response = await strapi.query('plugin::pdf-designer.pdf-template').findMany({ where: params });
        if (!response){
          throw Error
        }
        return response
      } catch (error) {
        console.log(error)
      }
    },

    /**
     * Promise to add a template.
     * @return {Promise}
     */
    async create(values) {
      try {
        const test = await strapi.query('plugin::pdf-designer.pdf-template').create({ data: values });
        if (!test){
          throw Error
        }
        return {
          values: values,
          templateCreate : test,
          success: true
      }
      } catch (error) {
        console.log(error)
      }
      
    },

    /**
     * Promise to edit a template.
     * @return {Promise}
     */
    async update(params, values) {
      // FIXME: ⬇︎ avoid duplicating templateReferenceId field
      try {
        const response = await strapi.query('plugin::pdf-designer.pdf-template').update({ where: params, data: values });
        if(!response) {
          throw Error
        }
        return response
      } catch (error) {
        console.log(error)
      } 
    },

    /**
     * Promise to remove a template.
     * @return {Promise}
     */
    async delete(params) {
      try {
        const response = await strapi.query('plugin::pdf-designer.pdf-template').delete({where: params})
        if (!response) {
          throw Error
        }
        return response
      } catch (error) {
        console.log(error)
      }
    },
  };
};
