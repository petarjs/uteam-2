import { ChakraProvider } from '@chakra-ui/provider';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App.jsx';
import theme from './utility-chakra/theme.jsx';

import './index.css';
import { AuthContextProvider } from 'context/AuthContext.jsx';
import { QuestionsOrderContextProvider } from 'context/QuestionsOrderContext.jsx';
import store from 'store/store.js';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AuthContextProvider>
          <QuestionsOrderContextProvider>
            <ChakraProvider theme={theme}>
              <App />
            </ChakraProvider>
          </QuestionsOrderContextProvider>
        </AuthContextProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
