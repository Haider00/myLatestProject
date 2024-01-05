import '@/styles/globals.css'

import { ApiProvider } from '@reduxjs/toolkit/query/react';

import { notes } from './api/usersapi';
import { Provider } from 'react-redux';
import {store} from '../store';
export default function App({ Component, pageProps }) {
  return <Provider store={store}> 
    <Component {...pageProps} />
  </Provider>
}
