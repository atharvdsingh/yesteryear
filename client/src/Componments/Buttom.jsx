

function Buttom({ text,container }) {
  return (
    <div className="flex cursor-pointer items-center justify-center gap-2 px-6 py-2.5 text-sm font-medium text-black bg-white rounded-full hover:bg-gray-200 active:scale-95 transition-all duration-200 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]">
        {container}
      {text}
    </div>
  );
}

export default Buttom;
