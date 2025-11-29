import { Home, LoaderCircle, Lock, Mail, User } from "lucide-react";
import React, { useState } from "react";
import Input from "../Componments/Input";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice.js";

function CreateAccuont() {
  axios.defaults.baseURL = import.meta.env.VITE_USER_URL;
  const dispatcher = useDispatch();

  const { handleSubmit, register } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const Createaccount = async (data) => {
    try {
      setLoading(true);
      const respons = await axios.post("/register", data);
      if (!respons) {
        setLoading(false);
        return toast.error("Response error");
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
      
      dispatcher(login(respons2.data.user));
      navigate("/");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full px-4">
      <form
        onSubmit={handleSubmit(Createaccount)}
        className="w-full max-w-md p-8 text-center border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm shadow-[0_0_40px_rgba(0,0,0,0.5)]"
      >
        <h1 className="text-white text-4xl font-playfair mb-2">
          Join YesterYear
        </h1>
        <p className="text-gray-400 text-sm mb-8 font-light">Start your journaling journey today</p>

        <div className="space-y-4">
          <div className="relative flex items-center">
            <div className="absolute left-4 text-gray-400">
              <User size={20} />
            </div>
            <Input
              type="text"
              placeholder="Full Name"
              className="pl-8"
              {...register("userName", {
                required: true,
              })}
            />
          </div>

          <div className="relative flex items-center">
            <div className="absolute left-4 text-gray-400">
              <Mail size={20} />
            </div>
            <Input
              type="email"
              placeholder="Email Address"
              className="pl-8"
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address"
                }
              })}
            />
          </div>

          <div className="relative flex items-center">
            <div className="absolute left-4 text-gray-400">
              <Lock size={20} />
            </div>
            <Input
              type="password"
              placeholder="Password"
              className="pl-8"
              {...register("password", {
                required: true,
              })}
            />
          </div>
        </div>

        <button
          disabled={loading}
          type="submit"
          className="mt-8 w-full flex justify-center items-center h-12 rounded-full text-black bg-white hover:bg-gray-200 transition-all duration-300 font-medium disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? ( 
            <LoaderCircle className="animate-spin" /> 
          ) : ('Create Account')}
        </button>

        <div className="text-gray-400 text-sm mt-6">
          Already have an account?{" "}
          <Link className="text-white hover:underline font-medium" to={"/login"}>
            Login
          </Link>
        </div>
        
        <div className="mt-6 flex justify-center">
          <Link className="text-gray-500 hover:text-white transition-colors" to="/">
            <Home className="w-6 h-6" />
          </Link>
        </div>
      </form>
    </div>
  );
}

export default CreateAccuont;
