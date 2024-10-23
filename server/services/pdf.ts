import _ from 'lodash';
import decode from 'decode-html';
import { htmlToText } from 'html-to-text';
import html_to_pdf from 'html-pdf-node';


const templateSettings = {
  evaluate: /\{\{(.+?)\}\}/g,
  interpolate: /\{\{=(.+?)\}\}/g,
  escape: /\{\{-(.+?)\}\}/g,
};

interface PdfTemplate {
  templateReferenceId?: string;
  html?: string;
  text?: string;
  subject?: string;
}

interface PdfFooter {
  footerString?: string;
}

interface StrapiInstance {
  log: {
    error: (message: string) => void;
  };
  db: {
    query: (model: string) => {
      findOne: (params: any) => Promise<any>;
    };
  };
  plugins: {
    [key: string]: {
      config: {
        [key: string]: any;
      };
    };
  };
}


export default ({ strapi }: { strapi: StrapiInstance }) => {
  const templater = (tmpl: string) => _.template(tmpl, templateSettings);
  const isMantainLegacyTemplateActive = () =>
    _.get(strapi.plugins, 'pdf-designer.config.mantainLegacyTemplate', true);

  /**
   * Promise to generate a PDF.
   * @return {Promise}
   */
  const generatePdf = async (pdfTemplate: PdfTemplate = {}, data: any = {}, myFooter: PdfFooter = {}) => {
    const { templateReferenceId } = pdfTemplate;
    const { footerString } = myFooter;
    const attributes = ['text', 'html', 'subject'];

    if (!templateReferenceId) {
      strapi.log.error(`No template reference specified`);
      throw new Error('No template reference specified');
    }

    try {
      const response = await strapi.db
        .query('plugin::pdf-designer.pdf-template')
        .findOne({ where: { templateReferenceId } });

      if (!response) {
        strapi.log.error(`No pdf template found with referenceId "${templateReferenceId}"`);
        throw new Error(`No pdf template found with referenceId "${templateReferenceId}"`);
      }

      let { bodyHtml, bodyText } = response;

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
          pdfTemplate[attribute as keyof PdfTemplate]
            ? { ...compiled, [attribute]: templater(pdfTemplate[attribute as keyof PdfTemplate] as string)(data) }
            : compiled,
        {} as PdfTemplate
      );

      const options = {
        footerTemplate: footerString
      };

      const files = { content: decode(templatedAttributes.html as string) };
      const bufferPDF = await html_to_pdf.generatePdf(files, options);

      return bufferPDF;
    } catch (error) {
      strapi.log.error(error);
      throw error;
    }
  };

  return {
    generatePdf,
  };
};