import { EmailTemplate } from "../types";
/**
 * Props needed for the ImportExportActions component
 */
type ImportExportActionsProps = {
    /**
     * The array of email templates
     *
     * @default []
     */
    data: EmailTemplate[];
    /**
     * The function that handles the export of templates
     */
    handleTemplatesExport: Function;
    /**
     * The function that reloads the data
     */
    reload: Function;
};
/**
 * Component responsible for displaying the import and export actions
 */
declare const ImportExportActions: ({ data, reload, handleTemplatesExport }: ImportExportActionsProps) => import("react/jsx-runtime").JSX.Element;
export default ImportExportActions;
