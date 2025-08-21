import { LucideClockFading } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

export default function Procted({childred,authentication=true}) {
    const [loading,setLoading]=useState(true)
    const navigator=useNavigate()
    const status=useSelector((state)=>state.auth.status)
    useEffect(()=>{
        if(authentication && status !== authentication ){
            navigator('/')
            

        }
        else if(!authentication && status !==authentication ){
            navigator('/login')
        }
setLoading(false)
    },[authentication,status])
  return (
<>
{
    loading ?(
        <h1>
            <LucideClockFading className='animate-spin' />
        </h1>
    ):(
        {childred}
    )
}


</>  )
}
