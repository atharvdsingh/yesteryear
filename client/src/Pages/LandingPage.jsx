import React from "react";
import Buttom from "../Componments/Buttom";
import Footer from "../Componments/Footer";
import { CircleUser, FileStack, Ghost, Heart, HeartCrack, ListStart } from "lucide-react";
import Input from "../Componments/Input";
import { useNavigate } from "react-router";
import Logout from "../Componments/Logout";
import { useSelector } from "react-redux";

function LandingPage() {
  const navigate = useNavigate();
  const status = useSelector((select) => select.auth.status);

  return (
    <>
      <div className="relative flex flex-col w-full min-h-screen overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <div className="w-full h-full bg-[url('/bg.avif')] bg-cover bg-center grayscale opacity-50" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center flex-1 w-full px-4 text-center">
          <div className="max-w-4xl space-y-8 animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-playfair text-white tracking-tight leading-tight">
              journal your life
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 font-inter font-light leading-relaxed max-w-2xl mx-auto">
              Writing your life is more than journaling — it’s a form of self-respect. 
              It’s choosing to give meaning to your experiences, to honor the person you were yesterday 
              and the person you’re becoming today.
            </p>

            <div className="flex flex-wrap justify-center gap-6 pt-8">
              {status ? (
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <button onClick={() => navigate("/all-post")}>
                    <Buttom container={<FileStack size={20} />} text={"My Journals"} />
                  </button>
                  <div className="text-white hover:text-gray-300 transition-colors">
                    <Logout />
                  </div>
                </div>
              ) : (
                <button onClick={() => navigate("/create-account")}>
                  <Buttom container={<CircleUser size={20} />} text={"Start Writing"} />
                </button>
              )}
            </div>
          </div>
        </div>
        
        <div className="relative z-10 w-full">
            <Footer />
        </div>
      </div>
    </>
  );
}

export default LandingPage;
