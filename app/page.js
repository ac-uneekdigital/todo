import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

//Components
import Todos from "./components/Todos";
import TodoLists from "./components/TodoLists";

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();
  const user = data?.session?.user.user_metadata;
  const authUser = data.session?.user

  if (data.session) {

    return (
      <>
        <main className="flex h-screen">
          <div className="w-2/12 h-full bg-white border-r-2 border-black"><TodoLists /></div>
          <div className="w-full lg:w-10/12 lg:mx-auto flex h-auto justify-center bg-white dark:bg-slate-800 p-2">
            <div className="h-auto w-full dark:bg-slate-900 bg-indigo-100 overflow-y-auto overflow-hidden">
              <Todos authUser={authUser} user={user} />
            </div>
          </div>
        </main>
      </>
    )
  }
  else {
    redirect("/login");
  }

}
