import { Route, Routes } from "react-router-dom";
import { Page } from "@strapi/strapi/admin";

// Utils
import styled from 'styled-components';
import { pluginId } from '../pluginId';

// Pages
import  HomePage  from './HomePage';
import  Designer  from './Designer';
import  HowToPage  from './HowToPage';

const App = () => {
  const PluginViewWrapper = styled.div`
    min-height: 100vh;
  `;

  return (
    <PluginViewWrapper>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path={`designn/:templateId`} element={<Designer />} />
        <Route path={`core/:coreEmailType`} element={<Designer isCore />} />
        <Route path={`how-to`} element={<HowToPage />} />
        <Route path="*" element={<Page.Error />} />
      </Routes>
    </PluginViewWrapper>
  );
};

export { App };
