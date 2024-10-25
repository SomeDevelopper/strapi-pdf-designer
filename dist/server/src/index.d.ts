export type { EmailConfig } from "./config";
declare const _default: {
    register: ({ strapi }: {
        strapi: import("@strapi/types/dist/core").Strapi;
    }) => void;
    bootstrap: ({ strapi }: {
        strapi: import("@strapi/types/dist/core").Strapi;
    }) => Promise<void>;
    destroy: ({ strapi }: {
        strapi: import("@strapi/types/dist/core").Strapi;
    }) => void;
    config: {
        default: () => import("./config").EmailConfig;
        validator(): void;
        pluginName: string;
    };
    controllers: {
        config: ({ strapi }: {
            strapi: import("@strapi/types/dist/core").Strapi;
        }) => import("./controllers/config").ConfigController;
        designer: {
            getTemplates: (ctx: any) => Promise<void>;
            getTemplate: (ctx: any) => Promise<void>;
            deleteTemplate: (ctx: any) => Promise<void>;
            saveTemplate: (ctx: any) => Promise<any>;
            duplicateTemplate: (ctx: any) => Promise<any>;
            getCoreEmailType: (ctx: any) => Promise<any>;
            saveCoreEmailType: (ctx: any) => Promise<any>;
        };
        pdf: {
            getTemplates: (ctx: any) => Promise<void>;
            getTemplate: (ctx: any) => Promise<void>;
            generate: (ctx: any) => Promise<any>;
        };
    };
    routes: {
        method: string;
        path: string;
        handler: string;
        config: {
            policies: any[];
            auth: boolean;
        };
    }[];
    services: {
        config: ({ strapi }: {
            strapi: import("@strapi/types/dist/core").Strapi;
        }) => import("./services/config").ConfigService;
        template: ({ strapi }: {
            strapi: import("@strapi/types/dist/core").Strapi;
        }) => import("./services/template").TemplateService;
        pdf: ({ strapi }: {
            strapi: import("./services/pdf").StrapiInstance;
        }) => {
            generatePdf: (pdfTemplate?: import("./services/pdf").PdfTemplate, data?: any, myFooter?: import("./services/pdf").PdfFooter) => Promise<any>;
        };
    };
    contentTypes: {
        'pdf-template': {
            schema: {
                kind: string;
                collectionName: string;
                info: {
                    singularName: string;
                    pluralName: string;
                    displayName: string;
                    name: string;
                };
                pluginOptions: {
                    "content-manager": {
                        visible: boolean;
                    };
                    "content-type-builder": {
                        visible: boolean;
                    };
                };
                options: {
                    draftAndPublish: boolean;
                    timestamps: boolean;
                    increments: boolean;
                    comment: string;
                };
                attributes: {
                    templateReferenceId: {
                        type: string;
                        required: boolean;
                        unique: boolean;
                    };
                    design: {
                        type: string;
                    };
                    name: {
                        type: string;
                    };
                    subject: {
                        type: string;
                    };
                    bodyHtml: {
                        type: string;
                    };
                    bodyText: {
                        type: string;
                    };
                    enabled: {
                        type: string;
                        default: boolean;
                    };
                    tags: {
                        type: string;
                    };
                };
            };
        };
    };
    policies: {};
    middlewares: {};
};
export default _default;
