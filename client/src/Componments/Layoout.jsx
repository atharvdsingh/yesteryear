import React from 'react'
import {Outlet} from 'react-router'
import Footer from './Footer'
function Layoout() {
  return (
    <>
    <main>
        <Outlet/>
    </main>
    <Footer/>
    


    </>
  )
}

export default Layoout