import { Lock, LogIn, Mail } from "lucide-react";
import React, { useState } from "react";
import Input from "../Componments/Input";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router";

function Login() {
  axios.defaults.baseURL = import.meta.env.VITE_USER_URL;
  const { register, handleSubmit} = useForm();
  const navigate=useNavigate()
  //   const [disable,setdisable]=useState(false)

  
  const handleLogin = async (data) => {
    // setdisable(true)
    console.log(data);


    const  user  = await axios.post('login',data,{
      withCredentials:true
    });
  
    
    // console.log(user);
  };

  return (
    <>
    <form
      onSubmit={handleSubmit(handleLogin)}
      className="max-w-96 w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white"
    >
      <h1 className="text-gray-900 text-3xl mt-10 font-medium">Login</h1>
      <p className="text-gray-500 text-sm mt-2">Please sign in to continue</p>
      <div className="flex items-center w-full mt-10 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
        <Mail />
        <Input
          type="email"
          placeholder={"Email"}
          {...register("email", {
            required: true,
            validate: {
              matchPatern: (value) =>
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                  value
                ) || "Invalid email address",
            },
          })}
        />
      </div>

      <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
        <Lock />
        <Input
          type="password"
          placeholder="password"
          {...register("password", {
            required: true,
          })}
        />
      </div>
      <div className="mt-5 text-left text-indigo-500">
        <a className="text-sm" href="#">
          {/* Forgot password? */}
        </a>
      </div>

      <button
        //   disabled={disable}

        type="submit"
        className="mt-2 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity"
      >
        Login
      </button>
      <p className="text-gray-500 text-sm mt-3 mb-11">
        Don’t have an account?{" "}
        <Link className="text-blue-600" to={'/create-account'} >Create Account</Link>
      </p>
    </form>
        </>

  );
}

export default Login;
