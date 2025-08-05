import { useState } from 'react'
import './App.css'
import LandingPage from './Pages/LandingPage'
import Footer from './Componments/Footer'
import Login from './Pages/Login'
import CreateAccuont from './Pages/CreateAccuont'
import Logout from './Componments/Logout'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Logout/>
    <div className="bg-white min-h-screen w-full flex justify-center items-center ">
      <CreateAccuont/>

  <Login/>
    </div>
      </>
  )
}

export default App
