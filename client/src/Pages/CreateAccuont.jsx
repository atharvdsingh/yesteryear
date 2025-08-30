import { LoaderCircleIcon, Lock, LucideClockFading, Mail, User } from "lucide-react";
import React, { useState } from "react";
import Input from "../Componments/Input";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice.js";
import Button2 from "../Componments/Buttom2.jsx";

function CreateAccuont() {
  axios.defaults.baseURL = import.meta.env.VITE_USER_URL;
  const dispatcher = useDispatch();

  const { handleSubmit, register } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const Createaccount = async (data) => {
    try {
      setLoading(true);
      // const data=axios.post('/register',data)
      const respons = await axios.post("/register", data);
      if (!respons) {
        setLoading(false);
        return toast.error("respons");
      }

      const respons2 = await axios.post(
        "/login",
        {
          email: data.email,
          password: data.password,
        },
        {
          withCredentials: true,
        }
      );
      if (!respons2) {
        setLoading(false);
        toast.error(error.response.data.message);
      }
      dispatcher(login(respons2.data.user));
      navigate("/");
      setLoading(false);
    } catch (error) {
      setLoading(false);

      toast.error(error);
      console.log(error);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(Createaccount)}
      className="max-w-96 w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white"
    >
      <h1 className="text-gray-900 text-3xl mt-10 font-medium">
        Create Account
      </h1>
      <p className="text-gray-500 text-sm mt-2">Please SignUp in to continue</p>

      <div className="flex items-center w-full mt-10 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
        <User />
        <Input
          type="text"
          placeholder={"Name"}
          {...register("userName", {
            required: true,
          })}
        />
      </div>

      <div className="flex items-center w-full mt-5 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
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
           disabled={loading}

        type="submit"
        className={`mt-2 w-full flex justify-center items-center h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity  `}
      >
        
        {loading ? ( <span className=" animate-spin text-green-100 " >  

            <LoaderCircleIcon/> 
        </span>
             ):('Create Account')}
        
      </button>
      <p className="text-gray-500 text-sm mt-3 mb-11">
        Don’t have an account?
        <Link className="text-blue-600" to={"/login"}>
          Login
        </Link>
      </p>
    </form>
  );
}

export default CreateAccuont;
