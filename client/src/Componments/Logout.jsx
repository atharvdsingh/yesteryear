import axios from 'axios'
import { Power } from 'lucide-react'
import React from 'react'


function Logout() {
    axios.defaults.baseURL = import.meta.env.VITE_USER_URL
    
    const logout=async () =>{
        try {
            const data= await axios.post('/logout',{},{
                withCredentials:true
            })
            console.log(data);
            
            } catch (error) {
            
        }

    }

  return (
    <button  onClick={logout} >

        <Power/>
    </button>
  )
}

export default Logout