import Image from "next/image";
import React from "react";

//icons
import { BiMoon, BiSun, BiPlus } from "react-icons/bi";

function Navbar({ user }) {
  const avatar = user.avatar_url;
  return (
    <nav className="flex justify-between items-center p-8 h-[70px] bg-indigo-100 shadow-sm">
      <h1 className="text-2xl text-indigo-900 font-black">Todo&apos;s</h1>
      <div className="flex gap-2">
        <button className="flex items-center gap-1 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg p-2">
          <BiPlus />
          Todo
        </button>
        {user && (
          <Image
            src={avatar}
            className="rounded-full w-12 shadow-md hover:scale-105 cursor-pointer"
            alt={"profile_picture"}
            height={150}
            width={150}
          />
        )}
        <button className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg p-2">
          <BiMoon />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
