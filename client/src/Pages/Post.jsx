import React, { useEffect } from 'react'
import { useParams } from 'react-router'

function Post() {

    const {id}=useParams()
    console.log(id);
    
    
  return (
    <div>hello world</div>
  )
}

export default Post