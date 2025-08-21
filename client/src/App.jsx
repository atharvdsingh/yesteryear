import { useEffect, useState } from "react";
import "./App.css";
import LandingPage from "./Pages/LandingPage";
import Footer from "./Componments/Footer";
import Login from "./Pages/Login";
import CreateAccuont from "./Pages/CreateAccuont";
import { createBrowserRouter, RouterProvider } from "react-router";
import CreatePost from "./Pages/CreatePost";
import Layoout from "./Componments/Layoout";
import Container from "./Componments/Container";
import Switch from "./Componments/Swtich";
import AllPost from "./Pages/AllPost";
import Post from "./Pages/Post";
import Edit from "./Pages/Edit";
import Procted from "./Componments/Procted";
import { useDispatch } from "react-redux";
import axios from "axios";
import { login } from "./store/authSlice";

function App() {
  axios.defaults.baseURL=import.meta.env.VITE_USER_URL
  const dispatcher=useDispatch()

  const fetchUser=async ()=>{
    const user=await axios.post('getme',{},{
      withCredentials:true
    })
    console.log(user);
    if(!user){
      return
    }
    dispatcher(login(user.data.data))
    
    
  }
  useEffect(()=>{
    fetchUser()



  },[])
 



  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layoout />,
      children: [
        {
          path: "/",
          element: <LandingPage />,
        },

        ,
        {
          path: "/create-post",
          element: (
          <Procted authentication={true

          } >
            <CreatePost/>
          </Procted>
          )
        },
      ],
    },
    {
      path: "/login",
      element: (
        <Procted authentication={false}>
          <Container object={<Login/>} >
          </Container>
        </Procted>
      ),
    },
    {
      path: "/create-account",
      element: (
        <Procted authentication={false}>
          <Container object={<CreateAccuont />}>
            <CreateAccuont />
          </Container>
        </Procted>
      ),
    },
    {
      path: "/all-post",
      element: (
        <Procted authentication={true}>
          <AllPost />
        </Procted>
      ),
    },
    {
      path: "/blog/:id",
      element: (
        <Procted authentication={true}>
          <Container object={<Post />}></Container>
        </Procted>
      ),
    },
    {
      path: "/edit/:id",
      element: (
        <Procted authentication={true}>
          <Container object={<Edit />}></Container>
        </Procted>
      ),
    },
  ]);

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
