import React from "react";
import Buttom from "../ Componments/Buttom";

function LandingPage() {
  return (
    <>
      <div className="flex flex-col w-full min-h-screen bg-[url('/bg.avif')] bg-cover bg-center bg-no-repeat">
        <div className="flex w-full justify-center gap-10 text-1xl">
          <span className=" text-gray-500 cursor-pointer mt-2  font-light">
            YesterDay
          </span>
          <span className="text-yellow-600 cursor-pointer mt-2 font-light">
            Login
          </span>
        </div>
        <div className="flex- justify-between min-w-full flex-1 align-middle bg-black ">

            <div className=" h-10 flex-1" >
                <Buttom/>
            </div>
            <div className=" h-10 flex-1 " ></div>
        </div>
        
      </div>
    </>
  );
}

export default LandingPage;
