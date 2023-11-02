"use client";
import Todo from "@/app/components/Todo";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import UpdateTodo from "./UpdateTodo";

function TodoList() {
  const [todos, setTodos] = useState([]);
  async function fetchData() {
    const supabase = createClientComponentClient();
    const { data: todos, error } = await supabase.from("todos").select();
    setTodos(todos);

    if (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {todos && (
        <div className="flex flex-col gap-2 justify-center p-2">
          {todos
            .sort()
            .reverse()
            .map((todo) => (
              <div
                key={todo.id}
                className="relative flex justify-between items-center rounded-md bg-red-300 h-20 w-full p-1"
              >
                <p className="text-2xl">{todo.task}</p>
                <UpdateTodo todo={todo} />
              </div>
            ))}
        </div>
      )}
      {!todos && <p>nothing to see here</p>}
    </>
  );
}

export default TodoList;
