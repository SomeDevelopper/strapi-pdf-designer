import { useIntl } from "react-intl";
import en from "../translations/en.json";
import { getTrad } from "../utils/getTrad";

/**
 *  Hook used to display the translated message based on the key passed in
 */
export const useTr = () => {
  const { formatMessage } = useIntl();
  return (key: keyof typeof en) => formatMessage({ id: getTrad(key) });
};
