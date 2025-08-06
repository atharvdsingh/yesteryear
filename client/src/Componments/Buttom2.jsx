import React from 'react';

const Button2 = () => {
  return (
    <div className="relative hover:text-white ">
      <button className="relative hover:text-white w-[200px] h-[50px] overflow-hidden border-2 border-[#252525] rounded-full text-[#333] font-extrabold tracking-widest transition-all duration-500 ease-in-out group bg-transparent">
        <span className="relative  z-10">Hello</span>
        <span className="absolute top-0 left-0 w-[10px] h-[10px] bg-[#333] rounded-full z-0 scale-0 group-hover:scale-[100] translate-x-[2px] transition-all duration-500 ease-in-out"></span>
      </button>
    </div>
  );
};

export default Button2;
