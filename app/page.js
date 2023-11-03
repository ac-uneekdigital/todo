import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

//Components
import Navbar from "./components/Navbar";
//Todo Components
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();
  const user = data?.session?.user.user_metadata;
  const authUser = data.session?.user

  if (data.session) {

    return (
      <>
        <Navbar user={user} />
        <main className="flex h-[calc(100vh-70px)] p-8">
          <div className="w-full lg:w-1/2 lg:mx-auto flex h-[calc(100vh-120px)] justify-center bg-indigo-100 dark:bg-slate-800 rounded-lg p-2 overflow-y-auto overflow-hidden">
            <div className="w-full dark:bg-slate-900 bg-indigo-100">
              <h1 className="text-center text-4xl font-black my-4">ToDo&apos;s</h1>
              <AddTodo authUser={authUser} />
              <TodoList />
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
