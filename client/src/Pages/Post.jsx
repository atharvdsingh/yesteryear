import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router'

function Post() {

    const {id}=useParams()
    console.log(id);
    const blog=useSelector((state)=>state.blog.blogData)    
   const gg=blog.find((s)=>s._id==id)
   console.log(gg);
   

    
    
  return (
    <div>hello world</div>
  )
}

export default Post