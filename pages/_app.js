import React from 'react'
import toast, { Toaster } from 'react-hot-toast';
import '../styles/globals.css'
// import type { AppProps } from 'next/app'
import {Layout}from '../components';
import {StateContext} from '../context/StateContext';
export default function App({ Component, pageProps }) {
  return ( 
    <StateContext>
      <Toaster/>
    <Layout>
    <Component {...pageProps} />
    </Layout>
    </StateContext>)
}
