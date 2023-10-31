import React from "react";

//icons
import { BiMoon, BiSun, BiPlus } from "react-icons/bi";

function Navbar() {
  return (
    <nav className="flex justify-between items-center p-8 h-[70px] bg-slate-50 shadow-sm">
      <h1 className="text-2xl text-indigo-500 font-black">Todo&apos;s</h1>
      <div className="flex gap-2">
        <button className="flex items-center gap-1 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg p-2">
          <BiPlus />
          Todo
        </button>
        <button className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg p-2">
          <BiMoon />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
