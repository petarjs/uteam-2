import { ChakraProvider } from '@chakra-ui/provider';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App.jsx';
import theme from './utility-chakra/theme.jsx';

import './index.css';
import { AnswersContextProvider } from 'context/AnswersContext.jsx';
import { AuthContextProvider } from 'context/AuthContext.jsx';
import { QuestionEditProvider } from 'context/QuestionEditContext.jsx';
import store from 'store/store.js';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AuthContextProvider>
          <QuestionEditProvider>
            <AnswersContextProvider>
              <ChakraProvider theme={theme}>
                <App />
              </ChakraProvider>
            </AnswersContextProvider>
          </QuestionEditProvider>
        </AuthContextProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
