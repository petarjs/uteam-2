import { ChakraProvider } from '@chakra-ui/provider';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App.jsx';
import theme from './utility-chakra/theme.jsx';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
