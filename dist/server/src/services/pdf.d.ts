export interface PdfTemplate {
    templateReferenceId?: string;
    html?: string;
    text?: string;
    subject?: string;
}
export interface PdfFooter {
    footerString?: string;
}
export interface StrapiInstance {
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
declare const _default: ({ strapi }: {
    strapi: StrapiInstance;
}) => {
    generatePdf: (pdfTemplate?: PdfTemplate, data?: any, myFooter?: PdfFooter) => Promise<any>;
};
export default _default;
