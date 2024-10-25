import { createdPDF, PDFConfig, PDFTemplate } from "../types";
/**
 * Date format for displaying dates in the UI
 */
export declare const DATE_FORMAT = "MMM DD, YYYY [at] h:mmA";
/**
 * Fetches all email templates
 */
export declare const getTemplatesData: () => Promise<PDFTemplate[]>;
/**
 * Get the editor configuration by the key passed in
 */
export declare const getEditorConfig: (key?: string) => Promise<any>;
/**
 * Get the full editor configuration
 */
export declare const getFullEditorConfig: () => Promise<PDFConfig>;
/**
 * Get the email template by the ID
 */
export declare const getTemplateById: (id: string) => Promise<PDFTemplate>;
/**
 * Get the core email template by the type
 */
export declare const getCoreTemplate: (coreEmailType: string) => Promise<PDFTemplate>;
/**
 * Create/Update a custom email template
 */
export declare const createTemplate: (templateId: string, data: PDFTemplate) => Promise<createdPDF>;
/**
 * Update a core email template
 */
export declare const updateCoreTemplate: (coreEmailType: string, data: PDFTemplate) => Promise<PDFTemplate>;
/**
 * Duplicate a custom email template
 */
export declare const duplicateTemplate: (id: string) => Promise<PDFTemplate>;
/**
 * Delete a custom email template
 */
export declare const deleteTemplate: (id: string) => Promise<{
    success: boolean;
}>;
/**
 * Download a based on the ID and the type passed in.
 *
 * This triggers a download of the file.
 */
export declare const downloadTemplate: (id: string, type: "html" | "json") => Promise<void>;
