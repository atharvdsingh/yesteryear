import axios from 'axios'
import { Power } from 'lucide-react'
import React from 'react'
import Buttom from './Buttom'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { logout } from '../store/authSlice'
import api from '../api/axios'



function Logout() {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    
    const handleLogoutt=async () =>{
        try {
            const data= await api.post('user/logout',{},{
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
        <Buttom text={"Logout"} container={    <Power className='w-4' />} >

    
        </Buttom>


    </button>
  )
}

export default Logout
