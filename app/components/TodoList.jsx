"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import Todo from "./Todo";

function TodoList({ authUser }) {
  const [todos, setTodos] = useState([]);

  async function fetchData() {
    const supabase = createClientComponentClient();
    const { data: todos, error } = await supabase
      .from("todos")
      .select()
      .order("id", { ascending: false });
    setTodos(todos);

    if (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [todos]);

  return (
    <>
      {todos && (
        <div className="flex flex-col gap-2 justify-center p-2">
          {todos.map((todo) => (
            <Todo key={todo.id} todo={todo} />
          ))}
        </div>
      )}
      {!todos && <p>nothing to see here</p>}
    </>
  );
}

export default TodoList;
