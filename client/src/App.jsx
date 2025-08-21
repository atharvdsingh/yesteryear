import { useState } from "react";
import "./App.css";
import LandingPage from "./Pages/LandingPage";
import Footer from "./Componments/Footer";
import Login from "./Pages/Login";
import CreateAccuont from "./Pages/CreateAccuont";
import Logout from "./Componments/Logout";
import { createBrowserRouter, RouterProvider } from "react-router";
import CreatePost from "./Pages/CreatePost";
import Layoout from "./Componments/Layoout";
import Container from "./Componments/Container";
import Switch from "./Componments/Swtich";
import AllPost from "./Pages/AllPost";
import Post from "./Pages/Post";
import Edit from "./Pages/Edit";

function App() {
  const [count, setCount] = useState(0);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layoout/>,
      children: [
        {
          path: "/",
          element: <LandingPage />,
        },
        
        ,
        {
          path: "/create-post",
          element:(
            
            <CreatePost />
          ) ,
        },
      ],
    },
    {
          path: "/login",
          element:(
            <Container object={<Login/>} >
                  


             
            </Container>
          )
        },
        {
          path: "/create-account",
          element: (
            <Container object={<CreateAccuont/>} >

          <CreateAccuont />
            </Container>

          ),
        },{
          path:"/all-post",
          element:(
            <Container object={<AllPost/>} >

            </Container>
          )
        },{
          path:"/blog/:id",
          element:(
            <Container object={<Post/>} >

            </Container>
          )
        },
        {
          path:'/edit/:id',
          element:(
            <Container object={<Edit/>} >

            </Container>
          )
        }
 
  ]);

  return <>
  <RouterProvider router={router}>
    

  </RouterProvider>
  
  </>;
}

export default App;
