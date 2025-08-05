import React, { forwardRef, useId } from "react";

const Input = forwardRef(function Input(
  { label, type = "text", className = "", placeholder="Enter Your detail" ,...props  },
  ref
) {
  const id = useId();

  return (
    <>
      <div className="flex items-center text-sm bg-white h-12 border pl-2 rounded border-gray-500/30 w-full max-w-md">
        <input
          className={`px-2 w-full h-full outline-none text-gray-500 bg-transparent ${className} `}
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
