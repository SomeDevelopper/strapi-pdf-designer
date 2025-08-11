import { Page } from "@strapi/strapi/admin";
import { Route, Routes } from "react-router-dom";
import Designer from "./Designer";
import { HomePage } from "./HomePage";
import { DesignSystemProvider, darkTheme } from "@strapi/design-system";

const App = () => {
  //const locale = detect locale from the environment or context 'fr-FR'; // Example locale, replace with actual logic if needed
  const locale = Intl.DateTimeFormat().resolvedOptions().locale;
  console.log("Current locale:", locale);
  return (
    <DesignSystemProvider locale={locale} theme={darkTheme}>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="design/:templateId" element={<Designer />} />
        <Route path="core/:coreEmailType" element={<Designer isCore />} />
        <Route path="*" element={<Page.Error />} />
      </Routes>
    </DesignSystemProvider>
  );
};

export { App };
