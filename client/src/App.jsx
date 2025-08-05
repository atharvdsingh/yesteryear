import { useState } from 'react'
import './App.css'
import LandingPage from './Pages/LandingPage'
import Footer from './ Componments/Footer'
import Login from './Pages/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="bg-white min-h-screen w-full flex justify-center items-center ">

  <Login/>
    </div>
      </>
  )
}

export default App
