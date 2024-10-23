import en from "../translations/en.json";
/**
 *  Hook used to display the translated message based on the key passed in
 */
export declare const useTr: () => (key: keyof typeof en) => string;
