import { useState } from 'react'
import './App.css'
import LandingPage from './Pages/LandingPage'
import Footer from './ Componments/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <LandingPage/>
    <Footer/>
    </>
  )
}

export default App
