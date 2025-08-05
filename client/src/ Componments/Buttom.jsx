

function Buttom({ text,container }) {
  return (
    <div className="flex cursor-pointer items-center hover:gap-6 gap-2.5 border border-gray-500/30 px-4 py-2 text-sm text-gray-800 rounded bg-white  hover:border-black active:scale-95 transition-all ">
        {container}
      {text}
    </div>
  );
}

export default Buttom;
