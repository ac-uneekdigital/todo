import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

//Components
import Navbar from "./components/Navbar";
//Todo Components
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";
import DestroyTodo from "./components/DestroyTodo";

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();
  const user = data?.session?.user.user_metadata;
  const authUser = data.session?.user

  const { data: todos, error } = await supabase.from("todos").select();
  var sortedTodos = todos
    .sort((a, b) => {
      return (
        new Date(a.inserted_at).getTime() - new Date(b.inserted_at).getTime()
      );
    })
    .reverse();

  if (error) {
    console.log(error);
  }

  if (data.session) {

    return (
      <>
        <Navbar user={user} />
        <main className="flex h-[calc(100vh-70px)] justify-between items-center w-10/12 gap-3 mx-auto p-8">
          <div className="h-auto w-1/3 flex flex-col items-center gap-4 bg-indigo-100 dark:bg-slate-800 rounded-lg p-8">
            <h2 className="text-3xl">Add Todo</h2>
            <AddTodo authUser={authUser} />
          </div>
          <div className="w-1/2 flex h-[600px] justify-center bg-indigo-100 dark:bg-slate-800 rounded-lg p-2 overflow-y-auto overflow-hidden">
            <div className="min-h-[6000px] w-full bg-black">
              <TodoList todos={todos} sortedTodos={sortedTodos} />
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
