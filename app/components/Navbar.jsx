import Image from "next/image";
import React from "react";

//components
import ThemeSwitcher from "@/app/components/theme/ThemeSwitcher";

//icons
import { BiMoon, BiSun, BiPlus } from "react-icons/bi";

function Navbar({ user }) {
  const avatar = user.avatar_url;
  return (
    <nav className="flex justify-between items-center p-8 h-[70px] bg-indigo-100 dark:bg-gray-950 shadow-sm">
      <h1 className="text-2xl text-black dark:text-slate-400 font-black">
        Todo&apos;s
      </h1>
      <div className="flex gap-2">
        {user && (
          <Image
            src={avatar}
            className="rounded-full w-12 shadow-md hover:scale-105 cursor-pointer"
            alt={"profile_picture"}
            height={150}
            width={150}
          />
        )}
        <ThemeSwitcher />
      </div>
    </nav>
  );
}

export default Navbar;
