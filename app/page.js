import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import Image from 'next/image'
import Navbar from "./components/Navbar";

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();
  const user = data?.session?.user.user_metadata;

  if (data.session) {

    return (
      <>
        <Navbar user={user} />
        <main className="flex flex-col h-screen items-center p-16">
          <h1 className='text-slate-900 font-bold text-4xl'>Todo&apos;s</h1>
          <div className='h-auto w-6/12 m-4 bg-slate-200 rounded-lg shadow-md p-8'>
            <form
              className='flex justify-center'>
              <input
                type="text"
                name="search"
                className="h-12 w-11/12 bg-white rounded-lg indent-3"
                placeholder="search for a todo"
              >
              </input>
            </form>
            {user && (<p className="text-black">{user.full_name}</p>)}
          </div>

        </main>  </>
    )
  }
  else {
    redirect("/login");
  }

}
