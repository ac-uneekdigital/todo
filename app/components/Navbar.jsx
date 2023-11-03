"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

//components
import ThemeSwitcher from "@/app/components/theme/ThemeSwitcher";

//icons

function Navbar({ user }) {
  const avatar = user.avatar_url;
  const [showMenu, SetShowMenu] = useState(false);

  function handleClick() {
    SetShowMenu(!showMenu);
  }

  function handleMouseOver() {
    SetShowMenu(showMenu);
  }

  function handleMouseLeave() {
    setTimeout(() => {
      SetShowMenu(!showMenu);
    }, 125);
  }

  const router = useRouter();
  const handleLogOut = async () => {
    const supabase = createClientComponentClient();
    const { error } = await supabase.auth.signOut();

    if (!error) {
      router.push("/login");
      router.refresh();
    }
    if (error) {
      console.log(error);
    }
  };

  return (
    <nav className="w-full bg-indigo-100 dark:bg-gray-950 shadow-sm">
      <div className="w-full mx-auto lg:w-[1366px] h-[70px] flex justify-between items-center self-center">
        <h1 className="text-2xl text-black dark:text-slate-400 font-black">
          Todo&apos;s
        </h1>
        <div className="relative flex gap-2">
          {showMenu && (
            <div
              className="absolute -bottom-16 -start-8 w-32 h-12 rounded-lg shadow-sm bg-indigo-100 dark:bg-gray-950 text-black dark:text-white"
              onMouseOver={handleMouseOver}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className="flex items-center justify-center p-3 cursor-pointer"
                onClick={handleLogOut}
              >
                Logout
              </div>
            </div>
          )}
          <div onClick={handleClick}>
            {user && (
              <Image
                src={avatar}
                className="rounded-full w-12 shadow-md hover:scale-105 cursor-pointer"
                alt={"profile_picture"}
                height={150}
                width={150}
              />
            )}
          </div>
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
