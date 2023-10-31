import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

async function TodoList() {
  "dyncamic";
  const supabase = createServerComponentClient({ cookies });
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

  return (
    <>
      {todos && (
        <div className="flex flex-col gap-2 justify-center p-2">
          {sortedTodos.map((todo) => (
            <div
              key={todo.id}
              className="relative flex justify-between items-center rounded-md bg-red-300 h-20 w-full p-1"
            >
              <p className="text-2xl">{todo.task}</p>
              <form>
                <input
                  type="checkbox"
                  className="h-12 w-12 rounded-full accent-indigo-400 text-indigo-600"
                ></input>
              </form>
            </div>
          ))}
        </div>
      )}
      {!todos && <p>nothing to see here</p>}
    </>
  );
}

export default TodoList;
