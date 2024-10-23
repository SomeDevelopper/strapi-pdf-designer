declare const _default: {
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
export default _default;
