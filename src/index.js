import { ChakraProvider } from '@chakra-ui/provider';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App.jsx';
import theme from './utility-chakra/theme.jsx';

import './index.css';
import { AuthContextProvider } from 'context/AuthContext.jsx';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
