/**
 * Get the URL to a specific page in the plugin
 */
export declare const getUrl: (to?: string) => string;
export declare const standardEmailRegistrationTemplate: {
    counters: {
        u_row: number;
        u_content_text: number;
        u_content_image: number;
        u_column: number;
    };
    body: {
        values: {
            backgroundColor: string;
            linkStyle: {
                body: boolean;
                linkHoverColor: string;
                linkHoverUnderline: boolean;
                linkColor: string;
                linkUnderline: boolean;
            };
            contentWidth: string;
            backgroundImage: {
                repeat: boolean;
                center: boolean;
                fullWidth: boolean;
                url: string;
                cover: boolean;
            };
            contentAlign: string;
            textColor: string;
            _meta: {
                htmlID: string;
                htmlClassNames: string;
            };
            fontFamily: {
                label: string;
                value: string;
            };
            preheaderText: string;
        };
        rows: {
            cells: number[];
            values: {
                backgroundImage: {
                    cover: boolean;
                    url: string;
                    repeat: boolean;
                    fullWidth: boolean;
                    center: boolean;
                };
                hideDesktop: boolean;
                selectable: boolean;
                columnsBackgroundColor: string;
                hideable: boolean;
                backgroundColor: string;
                padding: string;
                columns: boolean;
                _meta: {
                    htmlID: string;
                    htmlClassNames: string;
                };
                deletable: boolean;
                displayCondition: null;
                duplicatable: boolean;
                draggable: boolean;
            };
            columns: {
                contents: {
                    values: {
                        hideDesktop: boolean;
                        duplicatable: boolean;
                        deletable: boolean;
                        linkStyle: {
                            linkHoverUnderline: boolean;
                            linkColor: string;
                            inherit: boolean;
                            linkUnderline: boolean;
                            linkHoverColor: string;
                        };
                        hideable: boolean;
                        lineHeight: string;
                        draggable: boolean;
                        containerPadding: string;
                        text: string;
                        _meta: {
                            htmlID: string;
                            htmlClassNames: string;
                        };
                        textAlign: string;
                        selectable: boolean;
                    };
                    type: string;
                }[];
                values: {
                    border: {};
                    _meta: {
                        htmlClassNames: string;
                        htmlID: string;
                    };
                    backgroundColor: string;
                    padding: string;
                };
            }[];
        }[];
    };
    schemaVersion: number;
};
