import '@/styles/globals.css'

import { ApiProvider } from '@reduxjs/toolkit/query/react';

import { notes } from './api/usersapi';
import { Provider } from 'react-redux';
import {store} from '../store';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }) {
  return <Provider store={store}> 
    <Component {...pageProps} />
    <ToastContainer/>
  </Provider>
}
