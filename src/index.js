import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';
import ruRu from 'antd/locale/ru_RU';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <QueryClientProvider client={queryClient}>
    <ConfigProvider
      locale={ruRu}
      theme={{
        token: {
          colorPrimary: '#ed0e42',
          fontSize: 18,
          borderRadius: 16,
          // colorBgContainer: '#ffffff',
        },
        components: {
          Switch: {
            fontSize: 22,
          },
          Button: {
            borderRadius: 50,
          },

          AutoComplete: {
            borderRadius: 50,
          }
        },
      }}
    >
      <App />
    </ConfigProvider>
  </QueryClientProvider>
);
