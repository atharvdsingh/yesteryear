import React, { useState } from 'react';

const Switch = (
) => {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex items-center gap-4 text-base font-medium text-gray-800 select-none">
      

      <label htmlFor="switch" className="relative inline-block w-[60px] h-[32px]">
        <input
          id="switch"
          type="checkbox"
          checked={checked}
          onChange={() => setChecked(!checked)}
          className="sr-only peer"
        />

        <div className="absolute top-0 left-0 w-full h-full bg-gray-700 rounded-full peer-checked:bg-yellow-400 transition-colors duration-300"></div>

        <div className="absolute top-[3px] left-[3px] w-[26px] h-[26px] bg-white rounded-full shadow-md transform transition-transform duration-300 peer-checked:translate-x-[28px]"></div>
      </label>

      <span className="w-[90px] h-[26px] relative overflow-hidden text-sm font-bold text-gray-700">
        <span
          className={`absolute left-0 top-0 transition-all duration-200 ${
            checked ? 'opacity-0 -translate-y-full' : 'opacity-100 translate-y-0'
          }`}
        >
          Don’t Publish
        </span>
        <span
          className={`absolute left-0 top-0 transition-all duration-200 ${
            checked ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
          }`}
        >
          Publish
        </span>
      </span>
    </div>
  );
};

export default Switch;
