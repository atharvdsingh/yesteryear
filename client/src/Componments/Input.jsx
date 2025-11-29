import React, { forwardRef, useId } from "react";

const Input = forwardRef(function Input(
  { label, type = "text", className = "", placeholder="Enter Your detail" ,...props  },
  ref
) {
  const id = useId();

  return (
    <>
      <div className="flex items-center text-sm bg-white/5 h-12 border border-white/10 pl-4 rounded-lg w-full max-w-md focus-within:border-white/30 focus-within:bg-white/10 transition-all duration-300">
        <input
          className={`w-full h-full outline-none text-white bg-transparent placeholder:text-gray-500 ${className} `}
          type={type}
          placeholder={placeholder}
          {...props}
          ref={ref}
          id={id}
        />
      </div>
    </>
  );
});
export default Input
