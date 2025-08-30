import axios from 'axios'
import { Power } from 'lucide-react'
import React from 'react'
import Buttom from './Buttom'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { logout } from '../store/authSlice'



function Logout() {
    axios.defaults.baseURL = import.meta.env.VITE_USER_URL
    const navigate=useNavigate()
    const dispatch=useDispatch()
    
    const handleLogoutt=async () =>{
        try {
            const data= await axios.post('/logout',{},{
                withCredentials:true
            })
            console.log(data);
            

            
                 dispatch(logout())
          
            console.log(data);

            
            } catch (error) {
                console.log(error);
                
            
        }

    }

  return (
    <button  onClick={handleLogoutt } >
        <Buttom text={"Logout"} >

        <Power/>
        </Buttom>


    </button>
  )
}

export default Logout
