import React from "react";
import Buttom from "../ Componments/Buttom";
import Footer from "../ Componments/Footer";

function LandingPage() {
  return (
    <>
      <div className="flex flex-col w-full min-h-screen bg-[url('/bg.avif')] bg-cover bg-center bg-no-repeat">
        <div className="flex w-full justify-center gap-10 text-1xl">
          <span className=" text-white cursor-pointer mt-2  font-light">
            YesterYear
          </span>
          <span className="text-yellow-600 cursor-pointer mt-2 font-light">
            Login
          </span>
        </div>
        <div className="flex-col flex justify-center w-full  gap-4 flex-1 items-center  ">
          <h1 className="text-white text-7xl font-poppins">
            journal your life
          </h1>
          <p className="text-gray-300 w-[60vw] mt-3 text-wrap">
Writing your life is more than journaling — it’s a form of self-respect. It’s choosing to give meaning to your experiences, to honor the person you were yesterday and the person you’re becoming today. We forget so much, so easily. But your words help you remember — not just what happened, but how it shaped you.
Our memories are fragile. They fade in silence and disappear in distraction. But when you write, you give them shape. You bring clarity to the chaos, beauty to the mundane, and purpose to the pain. YesterYear is not just a digital notebook — it's your memory companion.
          </p>

          <div className="flex flex-wrap justify-center gap-10 items-center">
        <button> 
            <Buttom text={"Get Started"
} />


        </button>

          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default LandingPage;
