import React from 'react'
import Head from 'next/head'
import Navebar from './Navebar'
import Footer from './Footer'
const Layout = ({children}) => {
  return (
    <div className='layout'>
      <Head> <title>Shashank Gadwal</title> </Head>
      <header>
        <Navebar/>
      </header>
      <main className='main-header'>{children}</main>
      <footer><Footer/></footer>
    </div>
  )
}

export default Layout
