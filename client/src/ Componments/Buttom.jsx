import React from 'react'

function Buttom({text}) {
  return (
 <button type="button" class="flex cursor-pointer items-center gap-2.5 border border-gray-500/30 px-4 py-2 text-sm text-gray-800 rounded bg-white hover:text-white hover:bg-black hover:border-black active:scale-95 transition">

        {text}
    </button>  )
}

export default Buttom