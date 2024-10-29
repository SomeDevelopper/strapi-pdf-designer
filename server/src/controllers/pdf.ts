import _ from "lodash";
import { htmlToText } from "html-to-text";
import { isNil } from "lodash";
import configImport from "../config";
import type { Core } from "@strapi/strapi";

/**
 * email-designer.js controller
 *
 * @description: A set of functions called "actions" of the `email-designer` plugin.
 */

export default {
  /**
   * Get template design action.
   *
   * @return {Object}
   */
  getTemplates: async (ctx) => {
    const templates = await strapi.plugin(configImport.pluginName).service("template").findMany();
    ctx.send(templates);
  },

  /**
   * Get template design action.
   *
   * @return {Object}
   */
  getTemplate: async (ctx) => {
    if(!ctx.params.templateId){
      console.log('No template ID specified')
      throw Error
    }
    try {
      const template = await strapi
        .plugin(configImport.pluginName)
        .service("template")
        .findOne({ id: ctx.params.templateId });
      ctx.send(template);
    } catch (error) {
      console.log(error)
    }
  },

  generate: async (ctx) => {
    try {
        const { templateReferenceId } = ctx.params; 
        const { data, footerString } = ctx.request.body;
  
        if (!templateReferenceId) {
          return ctx.throw(400, 'templateReferenceId is required');
        }
  
        const pdfTemplate = { templateReferenceId };
        const data1 = { data }
        const myFooter = { footerString };
  
        const pdfBuffer = await strapi
          .plugin('pdf-designer-5')
          .service('pdf')
          .generatePdf(pdfTemplate, data1, myFooter);
  
        ctx.set('Content-Type', 'application/pdf');
        ctx.send(pdfBuffer);
  
    } catch (error) {
        strapi.log.error(error);
        // ctx.throw(500, error.message);
    }
  }

};
