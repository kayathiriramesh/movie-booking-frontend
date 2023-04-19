import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Provider from './context/Provider';
import { ChakraProvider } from '@chakra-ui/react'

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
   <Provider>
    <App />
   </Provider>
</ChakraProvider>  

  </React.StrictMode>,
  document.getElementById('root')
);

