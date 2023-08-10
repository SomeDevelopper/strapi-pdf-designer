'use strict'

const _ = require('lodash');
const decode = require('decode-html');
const { htmlToText } = require('html-to-text');
const html_to_pdf = require('html-pdf-node');

const templateSettings = {
  evaluate: /\{\{(.+?)\}\}/g,
  interpolate: /\{\{=(.+?)\}\}/g,
  escape: /\{\{-(.+?)\}\}/g,
};

module.exports = ({strapi}) => {
    const templater = (tmpl) => _.template(tmpl, templateSettings);
    const isMantainLegacyTemplateActive = () =>
    _.get(strapi.plugins, 'pdf-designer.config.mantainLegacyTemplate', true);

/**
   * Promise to send a composed HTML email.
   * @return {Promise}
   */
    const generatePdf = async (pdfTemplate = {}, data = {}, myFooter = {}) => {
        const { templateReferenceId } = pdfTemplate || {}
        const { footerString } = myFooter || {}
        const attributes = ['text', 'html', 'subject'];
        if(!templateReferenceId) {
          strapi.log.error(`No template reference specified`)
          throw Error
        }
        try {
        const response = await strapi.db
          .query('plugin::pdf-designer.pdf-template')
          .findOne({ where: { templateReferenceId } });

        if (!response) {
          strapi.log.error(`No pdf template found with referenceId "${templateReferenceId}"`);
          throw Error
        }
        let bodyHtml, bodyText
        ({bodyHtml, bodyText} = response)


        if (isMantainLegacyTemplateActive()) {
          bodyHtml = bodyHtml.replace(/<%/g, '{{').replace(/%>/g, '}}');
          bodyText = bodyText.replace(/<%/g, '{{').replace(/%>/g, '}}');
        }

        if ((!bodyText || !bodyText.length) && bodyHtml && bodyHtml.length)
          bodyText = htmlToText(bodyHtml, { wordwrap: 130, trimEmptyLines: true, uppercaseHeadings: false });

        pdfTemplate = {
          ...pdfTemplate,
          html: decode(bodyHtml),
          text: decode(bodyText),
        };

        const templatedAttributes = attributes.reduce(
          (compiled, attribute) =>
          pdfTemplate[attribute]
              ? Object.assign(compiled, { [attribute]: templater(pdfTemplate[attribute])(data) })
              : compiled,
          {}
        );

        const options = {
          footerTemplate: footerString
        }

        const files = {content: decode(templatedAttributes.html)}
        const bufferPDF = await html_to_pdf.generatePdf(files, options)

        return bufferPDF
      } catch (error) {
          strapi.log.error(error)
      }
      };

      return {
        generatePdf,
      }
}