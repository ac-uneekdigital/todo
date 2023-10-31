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
        <main className="flex h-[calc(100vh-70px)] w-10/12 gap-3 mx-auto p-8">
          <div className="w-1/2 flex justify-center bg-slate-200 rounded-lg p-2">
            <h2>Add Todo</h2>
          </div>
          <div className="w-1/2 flex justify-center bg-slate-300 rounded-lg p-2">
            <h2>Todos</h2>
          </div>
        </main>
      </>
    )
  }
  else {
    redirect("/login");
  }

}
