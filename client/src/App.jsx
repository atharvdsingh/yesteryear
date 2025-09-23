import { useEffect, useState } from "react";
import "./App.css";
import LandingPage from "./Pages/LandingPage";
import Footer from "./Componments/Footer";
import Login from "./Pages/Login";
import CreateAccuont from "./Pages/CreateAccuont";
import { createBrowserRouter, data, RouterProvider } from "react-router";
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
import { LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";
import Logout from "./Componments/Logout";

function App() {
  axios.defaults.baseURL=import.meta.env.VITE_USER_URL
  const dispatcher=useDispatch()
  const [loading,setLoading]=useState(true)

const fetchUser = async () => {
  try {
    const res = await axios.post("getme", {}, { withCredentials: true });

    if (res.data.success) {
      dispatcher(login(res.data.data));
    }
  } catch (error) {
    // Suppress 401 (not logged in), log only unexpected errors
    if (error.response?.status !== 401) {
      console.log();
      
    }
  } finally {
    setTimeout(() => setLoading(false), 1000);
  }
};
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
    {
      loading ?(
      
        <div className="flex justify-center items-center min-h-screen bg-black" >
          <p className="text-white font-extrabold text-2xl " >YesterYear</p>
        </div>
      ):(<RouterProvider router={router}></RouterProvider>)
    }
      
    </>
  );
}

export default App;
